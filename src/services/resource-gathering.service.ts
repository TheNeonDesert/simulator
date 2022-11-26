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
import { AvatarStore, useAvatarStore } from 'src/stores/avatar.store';
import Utils from './utils';

class ResourceGatheringService {
  private settingsStore: SettingsStore;
  private simulationStore: SimulationStore;
  private walletStore: WalletStore;
  private inventoryStore: InventoryStore;
  private avatarStore: AvatarStore;

  constructor() {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.walletStore = useWalletStore();
    this.inventoryStore = useInventoryStore();
    this.avatarStore = useAvatarStore();
  }

  genericResourceGathering(options: {
    locationKey: string;
    item?: Item;
    actionKey?: string;
    useItemAction?: boolean;
    minutes: number;
    skillKey?: string;
    randomEncounterCallback: (
      rewards: Rewards,
      results: string[],
      carrying: number
    ) => [Rewards, string[], number];
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
    let atCapacity = false;
    const resourceGainMultiplier = options.skillKey
      ? this.avatarStore.skills[options.skillKey]
      : 1;
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
              [rewards, results, carrying] = options.randomEncounterCallback(
                rewards,
                results,
                carrying
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
      for (
        let j = 0;
        j < resourceGatheringLocations[options.locationKey].rewards.length;
        j++
      ) {
        const reward =
          resourceGatheringLocations[options.locationKey].rewards[j];
        if (
          carrying + this.settingsStore[reward.quantityStoreKey] >=
          avatarService.calculateCarryingCapacity()
        ) {
          results.push(
            `Carrying capacity reached, max ${Utils.toTwoDecimal(
              avatarService.calculateCarryingCapacity()
            )}`
          );
          atCapacity = true;
          break;
        } else {
          rewards[reward.resourceKey] +=
            this.settingsStore[reward.quantityStoreKey] *
            resourceGainMultiplier;
          carrying += this.settingsStore[reward.quantityStoreKey];
        }
      }
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

      if (atCapacity) {
        break;
      }
    }

    results.push(
      `${
        resourceGatheringLocations[options.locationKey].activityName
      } complete, used ${i} of ${options.minutes} actions (${
        options.minutes
      } minutes)`
    );

    // collect rewards
    let resourcesGained = '';
    _.each(
      resourceGatheringLocations[options.locationKey].rewards,
      (reward) => {
        this.walletStore[reward.resourceKey] =
          (this.walletStore[reward.resourceKey] as number) +
          rewards[reward.resourceKey];

        resourcesGained += `${Utils.toTwoDecimal(
          rewards[reward.resourceKey]
        )} ${reward.resourceKey}, `;
      }
    );
    if (
      resourcesGained.substring(
        resourcesGained.length - 2,
        resourcesGained.length
      ) === ', '
    )
      resourcesGained = resourcesGained.substring(
        0,
        resourcesGained.length - 2
      );
    results.push('Gained ' + resourcesGained);
    // collect skill gain

    // skill gain
    // add whatever skill gain there is...

    this.simulationStore.totalActions += i;

    // TODO increment avatar's skill points
    return results;
  }

  forageAtWilderness(minutes: number) {
    const randomEncounterCallback = (
      rewards: Rewards,
      results: string[],
      carrying: number
    ): [Rewards, string[], number] => {
      // TODO convert to equipped melee weapon
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
        carrying++;
        results.push('Wolf Attack! You gained 1 Wolf Pelt');
      } else {
        // lose resouces and gain back carrying capacity
        carrying -= rewards.stone / 2;
        rewards.stone = rewards.stone / 2;
        carrying -= rewards.stick / 2;
        rewards.stick = rewards.stick / 2;
        carrying -= rewards.plantFiber / 2;
        rewards.plantFiber = rewards.plantFiber / 2;
        carrying -= rewards.apple / 2;
        rewards.apple = rewards.apple / 2;
        results.push(
          'Wolf Attack! You lost half of all carried resources... try crafting a dagger'
        );
      }
      return [rewards, results, carrying];
    };

    return this.genericResourceGathering({
      locationKey: 'wilderness',
      minutes: minutes,
      randomEncounterCallback: randomEncounterCallback,
    });
  }

  chopAtCedarForest(minutes: number): string[] {
    // TODO switch to equipped axe
    const axe = _.find(this.inventoryStore.items, (item) =>
      item.type.includes('axe')
    );
    if (!axe) {
      throw 'Missing item, axe';
    }

    const randomEncounterCallback = (
      rewards: Rewards,
      results: string[],
      carrying: number
    ): [Rewards, string[], number] => {
      const sling = _.find(this.inventoryStore.items, (item) =>
        // TODO switch to equipped ranged weapon
        item.type.includes('sling')
      );
      if (sling && sling.durability >= sling.actions['sling'].durabilityUsed) {
        sling.durability -= sling.actions['sling'].durabilityUsed;
        // TODO gain combat exp for killing eagle
        this.walletStore.stone--;
        this.walletStore.eagleFeather++;
        results.push('Eagle Attack! You gained 1 Eagle Feather');
        // TODO update carrying, both gain and loss
      } else {
        rewards.pineTar = 0;
        rewards.cedarLog = rewards.cedarLog * 0.9;
        results.push(
          'ALERT::Eagle Attack! You lost all carried Pine Tar and 10% of your carried Cedar Logs... try crafting a sling'
        );
      }
      return [rewards, results, carrying];
    };

    return this.genericResourceGathering({
      locationKey: 'cedarForest',
      item: axe,
      actionKey: 'chop',
      skillKey: 'woodcutting',
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
    // TODO switch to equipped pickaxe
    const pickaxe = _.find(this.inventoryStore.items, (item) =>
      item.type.includes('pickaxe')
    );
    if (!pickaxe) {
      throw 'Missing item, pickaxe';
    }

    const randomEncounterCallback = (
      rewards: Rewards,
      results: string[],
      carrying: number
    ): [Rewards, string[], number] => {
      if (this.settingsStore.chanceKoboldAttackPerAction > Math.random()) {
        // TODO switch to equipped melee weapon
        const sword = _.find(this.inventoryStore.items, (item) =>
          item.type.includes('sword')
        );
        if (
          sword &&
          sword.durability >= sword.actions['swing'].durabilityUsed
        ) {
          sword.durability -= sword.actions['swing'].durabilityUsed;
          // TODO gain combat exp for killing kobold
          this.walletStore.ruby++;
          results.push('Kobold Attack! You gained 1 Ruby');
          // TODO update carrying, both gain and loss
        } else {
          rewards.ruby = 0;
          results.push(
            'ALERT::Kobold Attack! You lost all your carried rubies... try crafting a sword'
          );
        }
      }
      return [rewards, results, carrying];
    };

    return this.genericResourceGathering({
      locationKey: 'copperMine',
      item: pickaxe,
      actionKey: 'dig',
      useItemAction: true,
      minutes: minutes,
      skillKey: 'mining',
      randomEncounterCallback: randomEncounterCallback,
    });

    // gain mining skill points 0.01 per minute
    // your gain is increased by 10% of your skill point
    // at 50, you don't gain sp here
    // TODO skills
  }
}

export default new ResourceGatheringService();
