import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import _ from 'underscore';

class SimulatorService {
  private settingsStore: SettingsStore;
  private simulationStore: SimulationStore;
  private inventoryStore: InventoryStore;

  constructor() {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.inventoryStore = useInventoryStore();
  }

  reset() {
    this.inventoryStore.stone = this.settingsStore.startingStone;
    this.inventoryStore.stick = this.settingsStore.startingStick;
    this.inventoryStore.plantFiber = this.settingsStore.startingPlantFiber;
    this.inventoryStore.apple = this.settingsStore.startingApple;

    // make this easier to just reset everything to its default..
    this.inventoryStore.wolfPelt = 0;
    this.inventoryStore.stoneDagger = 0;
    this.inventoryStore.leatherSack = 0;
    this.inventoryStore.cedarCopperArrow = 0;
    this.simulationStore.totalActions = 0;

    this.inventoryStore.items = [];
  }

  repairAllItems() {
    // TODO come up with cost
    _.each(this.inventoryStore.items, (item) => {
      item.durability = item.startingDurability;
    });
  }
}

export default new SimulatorService();
