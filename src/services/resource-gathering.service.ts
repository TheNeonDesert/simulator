import { Item } from 'src/models/Item';
import { WalletStore, useWalletStore } from 'src/stores/wallet.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import avatarService from './avatar.service';
import _ from 'underscore';
import { Rewards } from 'src/models/Rewards';
import resourceGatheringLocations from 'src/gamedata/resource-gathering-locations';

class ResourceGatheringService {
  private settingsStore: SettingsStore;
  private simulationStore: SimulationStore;
  private walletStore: WalletStore;
  private inventoryStore: InventoryStore;

  constructor() {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.walletStore = useWalletStore();
    this.inventoryStore = useInventoryStore();
  }

  genericResourceGathering(options: {
    locationKey: string;
    item?: Item;
    actionKey?: string;
    useItemAction?: boolean;
    minutes: number;
    randomEncounterCallback: (
      rewards: Rewards,
      results: string[]
    ) => [Rewards, string[]];
  }): string[] {
    if (!resourceGatheringLocations[options.locationKey]) {
      throw `Unknown location: ${options.locationKey}`;
    }
    // init rewards
    let rewards: Rewards = {};
    _.each(
      resourceGatheringLocations[options.locationKey].rewards,
      (reward) => {
        rewards[reward.resourceKey] = 0;
      }
    );
    let carrying = 0;
    let i;
    let results = [] as string[];
    for (i = 0; i < options.minutes; i++) {
      // random encounters
      if (resourceGatheringLocations[options.locationKey].randomEncounters) {
        _.each(
          resourceGatheringLocations[options.locationKey].randomEncounters as {
            name: string;
            encounterChanceKey: string;
          }[],
          (encounter) => {
            if (
              this.settingsStore[encounter.encounterChanceKey] > Math.random()
            ) {
              [rewards, results] = options.randomEncounterCallback(
                rewards,
                results
              );
            }
          }
        );
      }
      // use durability
      if (options.useItemAction && options.item && options.actionKey) {
        if (
          options.item.durability <
          options.item.actions[options.actionKey].durabilityUsed
        ) {
          // TODO Try to sub in next item of same type?
          results.push('Axe out of durability');
          break;
        }
        options.item.durability--;
      }
      // gather resources
      _.each(
        resourceGatheringLocations[options.locationKey].rewards,
        (reward) => {
          if (
            carrying + this.settingsStore[reward.quantityStoreKey] >=
            avatarService.calculateCarryingCapacity()
          ) {
            results.push('Carrying Capacity Reached');
            return;
          } else {
            rewards[reward.resourceKey] +=
              this.settingsStore[reward.quantityStoreKey];
            carrying += this.settingsStore[reward.quantityStoreKey];
          }
        }
      );
      // special/random resources
      if (
        resourceGatheringLocations[options.locationKey].randomResourceRewards
      ) {
        _.each(
          resourceGatheringLocations[options.locationKey]
            .randomResourceRewards as {
            resourceKey: string;
            rewardChanceKey: string;
          }[],
          (reward) => {
            if (this.settingsStore[reward.rewardChanceKey] > Math.random()) {
              this.walletStore[reward.resourceKey]++; // TODO amount added should be setting, not hardcoded to 1
            }
          }
        );
      }
    }
    // collect
    _.each(
      resourceGatheringLocations[options.locationKey].rewards,
      (reward) => {
        this.walletStore[reward.resourceKey] =
          (this.walletStore[reward.resourceKey] as number) +
          rewards[reward.resourceKey];
      }
    );
    this.simulationStore.totalActions += i;

    results.push(
      `${
        resourceGatheringLocations[options.locationKey].activityName
      } complete, resources gained`
    );
    return results;
  }

  forageAtWilderness(minutes: number) {
    const randomEncounterCallback = (
      rewards: Rewards,
      results: string[]
    ): [Rewards, string[]] => {
      const dagger = _.find(this.inventoryStore.items, (item) =>
        item.type.includes('dagger')
      );
      if (
        dagger &&
        dagger.durability >= dagger.actions['stab'].durabilityUsed
      ) {
        // TODO gain combat exp for killing wolf
        dagger.durability -= dagger.actions['stab'].durabilityUsed;
        this.walletStore.wolfPelt += 1;
        results.push('Wolf Attack! You gained 1 Wolf Pelt');
      } else {
        rewards.stone = rewards.stone / 2;
        rewards.stick = rewards.stick / 2;
        rewards.plantFiber = rewards.plantFiber / 2;
        rewards.apple = rewards.apple / 2;
        results.push(
          'Wolf Attack! You lost half of all carried resources... try crafting a dagger'
        );
      }
      return [rewards, results];
    };

    return this.genericResourceGathering({
      locationKey: 'wilderness',
      minutes: minutes,
      randomEncounterCallback: randomEncounterCallback,
    });
  }

  chopAtCedarForest(minutes: number): string[] {
    const axe = _.find(this.inventoryStore.items, (item) =>
      item.type.includes('axe')
    );
    if (!axe) {
      throw 'Missing item, axe';
    }

    const randomEncounterCallback = (
      rewards: Rewards,
      results: string[]
    ): [Rewards, string[]] => {
      const sling = _.find(this.inventoryStore.items, (item) =>
        item.type.includes('sling')
      );
      if (sling && sling.durability >= sling.actions['sling'].durabilityUsed) {
        sling.durability -= sling.actions['sling'].durabilityUsed;
        // TODO gain combat exp for killing eagle
        this.walletStore.stone--;
        this.walletStore.eagleFeather++;
        results.push('Eagle Attack! You gained 1 Eagle Feather');
      } else {
        rewards.pineTar = 0;
        rewards.cedarLog = rewards.cedarLog * 0.9;
        results.push(
          'Eagle Attack! You lost all carried Pine Tar and 10% of your carried Cedar Logs... try crafting a sling'
        );
      }
      return [rewards, results];
    };

    return this.genericResourceGathering({
      locationKey: 'cedarForest',
      item: axe,
      actionKey: 'chop',
      useItemAction: true,
      minutes: minutes,
      randomEncounterCallback: randomEncounterCallback,
    });

    // gain woddcutting skill points 0.01 per minute
    // your gain is increased by 10% of your skill point
    // at 50, you don't gain sp here
    // TODO skills
  }

  digAtCopperMine(minutes: number) {
    const pickaxe = _.find(this.inventoryStore.items, (item) =>
      item.type.includes('pickaxe')
    );
    if (!pickaxe) {
      throw 'Missing item, pickaxe';
    }

    const randomEncounterCallback = (
      rewards: Rewards,
      results: string[]
    ): [Rewards, string[]] => {
      if (this.settingsStore.chanceKoboldAttackPerAction > Math.random()) {
        if (avatarService.hasItem('sword')) {
          results.push('Kobold Attack! You gained 1 <TBD>'); // TODO what gain
          // TODO gain combat exp for killing kobold
        } else {
          rewards.gem = 0;
          results.push(
            'Kobold Attack! You lost all your carried gems... try crafting a sword'
          );
        }
      }
      return [rewards, results];
    };

    return this.genericResourceGathering({
      locationKey: 'copperMine',
      item: pickaxe,
      actionKey: 'dig',
      useItemAction: true,
      minutes: minutes,
      randomEncounterCallback: randomEncounterCallback,
    });

    // gain mining skill points 0.01 per minute
    // your gain is increased by 10% of your skill point
    // at 50, you don't gain sp here
    // TODO skills
  }
}

export default new ResourceGatheringService();
