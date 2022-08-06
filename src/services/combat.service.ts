import { Item } from 'src/models/Item';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

class CombatService {
  private settingsStore: SettingsStore;
  private simulationStore: SimulationStore;
  private inventoryStore: InventoryStore;

  constructor() {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.inventoryStore = useInventoryStore();
  }

  findAndRaidGoblinEncampment(weapon: Item) {
    weapon;
    // run through x goblins and a leader
    // turn based, you do x damage based on stat they do y, yours takes a ap, theirs takes b
  }
}

export default new CombatService();
