import { StoneAxe, StonePickaxe } from 'src/gamedata/craftable-items';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

class CraftingService {
  private settingsStore: SettingsStore;
  private simulationStore: SimulationStore;
  private inventoryStore: InventoryStore;

  constructor() {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.inventoryStore = useInventoryStore();
  }

  // TODO abstract this whole thing
  // gamedata/crafting-recipes.ts (craftable-items extension?)
  // this whole thing can be just a few lines...
  craft(itemKey: string) {
    switch (itemKey) {
      case 'stoneDagger':
        if (
          this.inventoryStore.stone <
          this.settingsStore.craftStoneDaggerRequiredStone
        ) {
          throw `Insufficient stone to craft stone dagger, need ${this.settingsStore.craftStoneDaggerRequiredStone}`;
        } else {
          this.inventoryStore.stone -=
            this.settingsStore.craftStoneDaggerRequiredStone;
          this.inventoryStore.stoneDagger++;
        }
        break;
      case 'leatherSack':
        if (
          this.inventoryStore.plantFiber <
          this.settingsStore.craftLeatherSackRequiredPlantFiber
        ) {
          throw `Insufficient plant fibers to craft leather sack, need ${this.settingsStore.craftLeatherSackRequiredPlantFiber}`;
        } else if (
          this.inventoryStore.wolfPelt <
          this.settingsStore.craftLeatherSackRequiredWolfPelts
        ) {
          throw `Insufficient wolf pelts to craft leather sack, need ${this.settingsStore.craftLeatherSackRequiredWolfPelts}`;
        } else {
          this.inventoryStore.plantFiber -=
            this.settingsStore.craftLeatherSackRequiredPlantFiber;
          this.inventoryStore.wolfPelt -=
            this.settingsStore.craftLeatherSackRequiredWolfPelts;
          this.inventoryStore.leatherSack++;
        }
        break;
      case 'stoneAxe':
        if (
          this.inventoryStore.plantFiber <
          this.settingsStore.craftStoneAxeRequiredPlantFiber
        ) {
          throw `Insufficient plant fibers to craft stone axe, need ${this.settingsStore.craftStoneAxeRequiredPlantFiber}`;
        } else if (
          this.inventoryStore.stone <
          this.settingsStore.craftStoneAxeRequiredStone
        ) {
          throw `Insufficient stones to craft stone axe, need ${this.settingsStore.craftStoneAxeRequiredStone}`;
        } else if (
          this.inventoryStore.stick <
          this.settingsStore.craftStoneAxeRequiredSticks
        ) {
          throw `Insufficient sticks to craft stone axe, need ${this.settingsStore.craftStoneAxeRequiredSticks}`;
        } else {
          this.inventoryStore.plantFiber -=
            this.settingsStore.craftStoneAxeRequiredPlantFiber;
          this.inventoryStore.stone -=
            this.settingsStore.craftStoneAxeRequiredStone;
          this.inventoryStore.stick -=
            this.settingsStore.craftStoneAxeRequiredSticks;

          this.inventoryStore.items.push(new StoneAxe());
        }
        break;
      case 'stonePickaxe':
        if (
          this.inventoryStore.plantFiber <
          this.settingsStore.craftStonePickAxeRequiredPlantFiber
        ) {
          throw `Insufficient plant fibers to craft stone pickaxe, need ${this.settingsStore.craftStonePickAxeRequiredPlantFiber}`;
        } else if (
          this.inventoryStore.stone <
          this.settingsStore.craftStonePickAxeRequiredStone
        ) {
          throw `Insufficient stones to craft stone pickaxe, need ${this.settingsStore.craftStonePickAxeRequiredStone}`;
        } else if (
          this.inventoryStore.stick <
          this.settingsStore.craftStonePickAxeRequiredSticks
        ) {
          throw `Insufficient sticks to craft stone pickaxe, need ${this.settingsStore.craftStonePickAxeRequiredSticks}`;
        } else {
          this.inventoryStore.plantFiber -=
            this.settingsStore.craftStonePickAxeRequiredPlantFiber;
          this.inventoryStore.stone -=
            this.settingsStore.craftStonePickAxeRequiredStone;
          this.inventoryStore.stick -=
            this.settingsStore.craftStonePickAxeRequiredSticks;

          this.inventoryStore.items.push(new StonePickaxe());
        }
        break;
      case 'cedarCopperAxe':
        // craftCedarCopperAxeRequiredCopper
        // craftCedarCopperAxeRequiredCedar
        break;
      case 'cedarCopperPickaxe':
        // craftCedarCopperPickaxeRequiredCopper
        // craftCedarCopperPickaxeRequiredCedar
        break;
      case 'wheelBarrow':
        break;
      default:
        throw `Trying to craft unknown item ${itemKey}`;
    }
  }
}

export default new CraftingService();
