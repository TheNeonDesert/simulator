import { WalletStore, useWalletStore } from 'src/stores/wallet.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import combatLocations, { enemies } from 'src/gamedata/combat-locations';
import _ from 'underscore';

class CombatService {
  private settingsStore: SettingsStore;
  private simulationStore: SimulationStore;
  private walletStore: WalletStore;

  constructor() {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.walletStore = useWalletStore();
  }

  findAndRaidGoblinEncampment() {
    // TODO check for and equip item
    _.each(
      _.sortBy(combatLocations['goblinEncampment'].enemies, 'order'),
      (enemy) => {
        // console.log('enemy:', enemy);
        for (let i = 0; i < enemy.quantity; i++) {
          let enemyHealth = enemies[enemy.enemyKey].health;
          while (enemyHealth > 0) {
            // TODO obey initize
            enemyHealth -= 10; // TODO use item dmg
            // TODO upate player health - enemies[enemy.enemyKey].damage
          }
          console.log(`killed ${enemy.enemyKey}`);
        }
      }
    );
    // run through x goblins and a leader
    // turn based, you do x damage based on stat they do y, yours takes a ap, theirs takes b
  }
}

export default new CombatService();
