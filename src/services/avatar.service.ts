import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

class AvatarService {
  private settingsStore: SettingsStore;
  private simulationStore: SimulationStore;
  private inventoryStore: InventoryStore;

  private skills: { [skill: string]: number } = {
    woodcutting: 1,
    mining: 1,
    swordsmanship: 1,
    exploration: 1,
  };

  constructor() {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.inventoryStore = useInventoryStore();
  }

  hasItem(itemKey: string): boolean {
    itemKey;
    return false;
  }

  calculateCarryingCapacity(): number {
    let carryingCapacity = this.settingsStore.carryingCapacity;
    if (this.inventoryStore.leatherSack > 0) {
      carryingCapacity += this.settingsStore.additionalCapacityFromLeatherSack;
    }
    return carryingCapacity;
  }

  recompile(skillsToEnhance: string[]) {
    // reset stat points
    // pay 1 neon plus 1 each for skillsToEnhance.length
    skillsToEnhance;
    // set all skills to 0, increase skills max
  }
}

export default new AvatarService();
