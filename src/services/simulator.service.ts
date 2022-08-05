import { Item } from 'src/models/Item';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import _ from 'underscore';
import { StoneAxe, StonePickaxe } from '../stores/craftable-items';

// TODO really split up and abstract out this puppy it's so unwieldly
// especially the models at the bottom

class Simulator {
  private settingsStore: SettingsStore;
  private simulationStore: SimulationStore;
  private inventoryStore: InventoryStore;

  constructor() {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.inventoryStore = useInventoryStore();
  }

  prerun() {
    this.inventoryStore.stone = this.settingsStore.startingStone;
    this.inventoryStore.stick = this.settingsStore.startingStick;
    this.inventoryStore.plantFiber = this.settingsStore.startingPlantFiber;
    this.inventoryStore.apple = this.settingsStore.startingApple;

    // make this easier..
    this.inventoryStore.wolfPelt = 0;
    this.inventoryStore.stoneDagger = 0;
    this.inventoryStore.leatherSack = 0;
    // this.inventoryStore.cedarBow = 0;
    this.inventoryStore.cedarCopperArrow = 0;

    this.inventoryStore.items = [];

    this.simulationStore.totalActions = 0;
  }

  private skills: { [skill: string]: number } = {
    woodcutting: 1,
    mining: 1,
    swordsmanship: 1,
    exploration: 1,
  };

  forageAtWilderness(minutes: number): string[] {
    const rewards = {
      stone: 0,
      stick: 0,
      plantFiber: 0,
      apple: 0,
    };
    let carrying = 0;
    let i;
    const results = [];
    for (i = 0; i < minutes; i++) {
      if (this.settingsStore.chanceWolfAttackPerAction > Math.random()) {
        if (this.inventoryStore.stoneDagger > 0) {
          this.inventoryStore.stoneDagger--;
          this.inventoryStore.wolfPelt += 1;
          results.push('Wolf Attack! You gained 1 Wolf Pelt');
        } else {
          rewards.stone = rewards.stone / 2;
          rewards.stick = rewards.stick / 2;
          rewards.plantFiber = rewards.plantFiber / 2;
          rewards.apple = rewards.apple / 2;
          results.push('Wolf Attack! You lost half of all carried resources');
        }
      } else {
        if (
          carrying + this.settingsStore.stoneGainedPerAction >=
          this.calculateCarryingCapacity()
        ) {
          results.push('Carrying Capacity Reached');
          break;
        } else {
          rewards.stone += this.settingsStore.stoneGainedPerAction;
          carrying += this.settingsStore.stoneGainedPerAction;
        }
        // add stick
        if (
          carrying + this.settingsStore.stickGainedPerAction >=
          this.calculateCarryingCapacity()
        ) {
          results.push('Carrying Capacity Reached');
          break;
        } else {
          rewards.stick += this.settingsStore.stickGainedPerAction;
          carrying += this.settingsStore.stickGainedPerAction;
        }
        // add plantFiber
        if (
          carrying + this.settingsStore.plantFiberGainedPerAction >=
          this.calculateCarryingCapacity()
        ) {
          results.push('Carrying Capacity Reached');
          break;
        } else {
          rewards.plantFiber += this.settingsStore.plantFiberGainedPerAction;
          carrying += this.settingsStore.plantFiberGainedPerAction;
        }
        // add apple
        if (
          carrying + this.settingsStore.appleGainedPerAction >=
          this.calculateCarryingCapacity()
        ) {
          results.push('Carrying Capacity Reached');
          break;
        } else {
          rewards.apple += this.settingsStore.appleGainedPerAction;
          carrying += this.settingsStore.appleGainedPerAction;
        }
      }
    }

    this.inventoryStore.stone += rewards.stone;
    this.inventoryStore.stick += rewards.stick;
    this.inventoryStore.plantFiber += rewards.plantFiber;
    this.inventoryStore.apple += rewards.apple;
    this.simulationStore.totalActions += i;

    results.push('Foraging complete, resources gained');
    return results;
  }

  chopAtCedarForest(minutes: number): string[] {
    const axe = _.find(this.inventoryStore.items, (item) =>
      item.type.includes('axe')
    );
    if (!axe) {
      throw 'Missing item, axe';
    }
    const results = [] as string[];

    const rewards = {
      cedarLog: 0,
      pineTar: 0,
    };
    let carrying = 0;
    let i;

    for (i = 0; i < minutes; i++) {
      // durability
      if (axe.durability < axe.actions.chop.durabilityUsed) {
        results.push('Axe out of durability');
        break;
      }
      axe.durability--;
      // eagle attack
      if (this.settingsStore.chanceEagleAttackPerAction > Math.random()) {
        console.log('eagle attack');
        // TODO add sling ability...
        if (this.avatarHas('bow') && this.inventoryStore.cedarCopperArrow > 0) {
          this.inventoryStore.cedarCopperArrow--;
          this.inventoryStore.eagleFeather--;
          results.push('Eagle Attack! You gained 1 Eagle Feather');
        } else {
          rewards.pineTar = 0;
          rewards.cedarLog = rewards.cedarLog * 0.9;
          results.push(
            'Eagle Attack! You lost all carried Pine Tar and 10% of your carried Cedar Logs'
          );
        }
      } else {
        // add cedarLog
        if (
          carrying + this.settingsStore.cedarLogsGainedPerAction >=
          this.calculateCarryingCapacity()
        ) {
          results.push('Carrying Capacity Reached');
          break;
        } else {
          rewards.cedarLog += this.settingsStore.cedarLogsGainedPerAction;
          carrying += this.settingsStore.cedarLogsGainedPerAction;
        }
      }
    }

    this.inventoryStore.cedarLog += rewards.cedarLog;
    this.inventoryStore.pineTar += rewards.pineTar;
    this.simulationStore.totalActions += i;

    results.push('Chopping complete, resources gained');
    return results;

    // TODO gain woddcutting skill points 0.01 per minute
    // your gain is increased by 10% of your skill point
    // at 50, you don't gain sp here
    // TODO skills
  }

  digAtCopperMine(minutes: number, pickaxe: Item) {
    minutes;
    pickaxe;
    // same as cedar forest
  }

  findAndRaidGoblinEncampment(weapon: Item) {
    weapon;
    // run through x goblins and a leader
    // turn based, you do x damage based on stat they do y, yours takes a ap, theirs takes b
  }

  // move to recipes or some other way to manage
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

  recompile(skillsToEnhance: string[]) {
    // reset stat points
    // pay 1 neon plus 1 each for skillsToEnhance.length
    skillsToEnhance;
    // set all skills to 0, increase skills max
  }

  calculateCarryingCapacity(): number {
    let carryingCapacity = this.settingsStore.carryingCapacity;
    if (this.inventoryStore.leatherSack > 0) {
      carryingCapacity += this.settingsStore.additionalCapacityFromLeatherSack;
    }
    return carryingCapacity;
  }

  repairAllItems() {
    // TODO come up with cost
    _.each(this.inventoryStore.items, (item) => {
      item.durability = item.startingDurability;
    });
  }

  avatarHas(itemKey: string): boolean {
    itemKey;
    return false;
  }
}

export default new Simulator();

const woodcutting: Skill = {
  name: 'Woodcutting',
};
woodcutting;

interface Skill {
  name: string;
  // skillsApplied?
}

// interface ActionResponse {
//   error?: boolean;
//   errorMessage?: string;
//   completedInFull: boolean;
//   stoppageReason?: string;
// }
