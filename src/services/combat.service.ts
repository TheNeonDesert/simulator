import { WalletStore, useWalletStore } from 'src/stores/wallet.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import combatLocations, { enemies } from 'src/gamedata/combat-locations';
import _ from 'underscore';
import { AvatarStore } from 'src/stores/avatar.store';
import { useAvatarStore } from '../stores/avatar.store';
import craftItem from 'src/gamedata/craftable-items';

class CombatService {
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

  findAndRaidGoblinEncampment(): string[] {
    const results = [] as string[];
    const sword = _.find(this.inventoryStore.items, (item) =>
      item.type.includes('sword')
    );
    if (!sword) {
      throw 'Missing item, sword';
    }
    if (this.avatarStore.health <= 0) {
      throw 'Out of health';
    }

    _.each(
      _.sortBy(combatLocations['goblinEncampment'].enemies, 'order'),
      (enemy) => {
        // for each enemy group
        // TODO figure out how to group by action point cost for things
        // like the loop would go once per action point, and counters would tick off, and as they're reached things would happen
        for (let i = 0; i < enemy.quantity; i++) {
          // for each individual enemy
          let enemyHealth = enemies[enemy.enemyKey].health;
          while (enemyHealth > 0) {
            // until each individual enemy is dead
            // TODO obey initiative
            // attack
            if (
              sword.baseDamage &&
              sword.durability >= sword.actions['swing'].durabilityUsed
            ) {
              sword.durability -= sword.actions['swing'].durabilityUsed;
              enemyHealth -= sword.baseDamage;
            } else {
              // results.push('Sword out of durability'); // TODO
              throw 'Sword out of durability';
            }
            // defend
            // TODO if armor/shield/dodge/etc
            this.avatarStore.health -= enemies[enemy.enemyKey].damage;
            if (this.avatarStore.health <= 0) {
              throw 'Out of health';
            }
          }
          const reward = enemy.generateReward();
          let rewardString = '';
          if (reward.resourceKey && reward.resourceQuantity) {
            this.walletStore[reward.resourceKey] += reward.resourceQuantity;
            rewardString += reward.resourceQuantity + ' ' + reward.resourceKey;
          }
          if (reward.craftableItemKey) {
            this.inventoryStore.items.push(
              craftItem[reward.craftableItemKey]({})
            ); // mint item
            rewardString += reward.craftableItemKey;
          }
          if (rewardString === '') {
            rewardString = 'nothing';
          }
          results.push(`Killed ${enemy.enemyKey}, ${rewardString} gained`); // TODO show what was gained
          // TODO roll enemy loot table
        }
      }
    );

    results.push('Raid complete, Goblin Encampment destroy');

    return results;
  }
}

export default new CombatService();
