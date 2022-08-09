import { WalletStore, useWalletStore } from 'src/stores/wallet.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import _ from 'underscore';

class SimulatorService {
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

  reset() {
    this.walletStore.stone = this.settingsStore.startingStone;
    this.walletStore.stick = this.settingsStore.startingStick;
    this.walletStore.plantFiber = this.settingsStore.startingPlantFiber;
    this.walletStore.apple = this.settingsStore.startingApple;

    // make this easier to just reset everything to its default..
    this.walletStore.wolfPelt = 0;
    this.walletStore.stoneDagger = 0;
    this.walletStore.leatherSack = 0;
    this.walletStore.cedarCopperArrow = 0;
    this.simulationStore.totalActions = 0;

    this.inventoryStore.items = [];
  }

  repairAllItems() {
    // TODO come up with cost to repair
    _.each(this.inventoryStore.items, (item) => {
      item.durability = item.startingDurability;
    });
  }
}

export default new SimulatorService();
