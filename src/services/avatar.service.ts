import { WalletStore, useWalletStore } from 'src/stores/wallet.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import _ from 'underscore';

// TODO apples for avatar stamina
// send avatars on expeditions and bring X apples along...
//

class AvatarService {
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

  hasItem(itemKey: string): boolean {
    itemKey;
    return false;
  }

  // TODO somehow tie this to a specific avatar and restrict how much they can carry
  calculateCarryingCapacity(): number {
    let carryingCapacity = this.settingsStore.carryingCapacity;

    _.each(this.inventoryStore.items, (item) => {
      if (
        item.type.includes('bag') &&
        item.attributes &&
        item.attributes['additionalCarryingCapacity']
      ) {
        carryingCapacity += item.attributes['additionalCarryingCapacity'];
      }
    });

    return carryingCapacity;
  }

  // TODO build recompile
  recompile(skillsToEnhance: string[]) {
    // reset stat points
    // pay 1 neon plus 1 each for skillsToEnhance.length
    skillsToEnhance;
    // set all skills to 0, increase skills max
  }
}

export default new AvatarService();
