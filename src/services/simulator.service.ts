import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

class Simulator {
  private settingsStore: SettingsStore;
  private simulationStore: SimulationStore;
  private inventoryStore: InventoryStore;

  constructor() {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.inventoryStore = useInventoryStore();

    // init
    this.simulationStore.results = '';

    // set defaults
    this.settingsStore.carryingCapacity = 50;

    // Wilderness
    this.settingsStore.stickGainedPerAction = 0.8;
    this.settingsStore.stoneGainedPerAction = 0.65;
    this.settingsStore.plantFiberGainedPerAction = 0.25;
    this.settingsStore.appleGainedPerAction = 0.08;
    this.settingsStore.chanceWolfAttackPerAction = 0.015;

    this.settingsStore.craftStoneDaggerRequiredStone = 10;

    // this.settingsStore.actionsPerMinute = 1;

    // this.settingsStore.startingCedar = 1000;
    // this.settingsStore.startingCedarCopperAxes = 90;

    // in theory, if the ratio between these two is consistent then growth curve will stay flat
    // but it doesn't quite work out that way
    // this.settingsStore.woodProducedPerAction = 10;
    // this.settingsStore.costOfWoodToCraftAxe = 100;

    // this.settingsStore.durabilityUsedPerAction = 5;
    // this.settingsStore.durabilityPtsPerAxe = 50;
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
    this.inventoryStore.cedarBow = 0;
    this.inventoryStore.cedarCopperArrow = 0;

    this.simulationStore.totalActions = 0;
  }
  //   // snapshot of settingsStore so we don't change model values
  //   for (const key in this.settingsStore) {
  //     if (this.settingsStore[key]) {
  //       this.settings[key] = this.settingsStore[key];
  //     }
  //   }
  // }

  // cleanUp() {
  //   this.settings = {} as SettingsStore;
  // }

  // philosophy here is each available action is its own function
  // you'd set settings from main dashboard page, "lock em in",
  // and then there's be a bunch of buttons that just equate to each function below
  // allow for starting resources and items

  private skills: { [skill: string]: number } = {
    woodcutting: 1,
    mining: 1,
    swordsmanship: 1,
    exploration: 1,
  };

  forageAtWilderness(minutes: number): void | string {
    const rewards = {
      stone: 0,
      stick: 0,
      plantFiber: 0,
      apple: 0,
    };
    let carrying = 0;
    let i;
    for (i = 0; i < minutes; i++) {
      // wolf attack
      if (this.settingsStore.chanceWolfAttackPerAction > Math.random()) {
        console.log('wolf attack');
        if (this.inventoryStore.stoneDagger > 0) {
          this.inventoryStore.stoneDagger--;
          this.inventoryStore.wolfPelt += 1;
        } else {
          rewards.stone = rewards.stone / 2;
          rewards.stick = rewards.stick / 2;
          rewards.plantFiber = rewards.plantFiber / 2;
          rewards.apple = rewards.apple / 2;
        }
      } else {
        // add stone
        if (
          carrying + this.settingsStore.stoneGainedPerAction >=
          this.calculateCarryingCapacity()
        ) {
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
          this.simulationStore.totalActions += i;
          return 'Carrying Capacity Reached';
        } else {
          rewards.stick += this.settingsStore.stickGainedPerAction;
          carrying += this.settingsStore.stickGainedPerAction;
        }
        // add plantFiber
        if (
          carrying + this.settingsStore.plantFiberGainedPerAction >=
          this.calculateCarryingCapacity()
        ) {
          this.simulationStore.totalActions += i;
          return 'Carrying Capacity Reached';
        } else {
          rewards.plantFiber += this.settingsStore.plantFiberGainedPerAction;
          carrying += this.settingsStore.plantFiberGainedPerAction;
        }
        // add apple
        if (
          carrying + this.settingsStore.appleGainedPerAction >=
          this.calculateCarryingCapacity()
        ) {
          this.simulationStore.totalActions += i;
          return 'Carrying Capacity Reached';
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
    // refactor to turn into a log/summary, maybe as a quick q-dialog
    if (i + 1 < minutes) {
      return ('Stopped early, carrying capacity reached' +
        rewards) as unknown as string;
    } else {
      return rewards as unknown as string;
    }
  }

  chopAtCedarForest(minutes: number, axe: Item) {
    minutes;
    axe;

    const rewards = {
      cedarLogs: 0,
      pineTar: 0,
    };
    let carrying = 0;
    let i;

    for (i = 0; i < minutes; i++) {
      // eagle attack
      if (this.settingsStore.chanceEagleAttackPerAction > Math.random()) {
        console.log('eagle attack');
        if (
          this.inventoryStore.cedarBow > 0 &&
          this.inventoryStore.cedarCopperArrow > 0
        ) {
          this.inventoryStore.cedarCopperArrow--;
        } else {
          rewards.pineTar = 0;
          rewards.cedarLogs = rewards.cedarLogs * 0.9;
        }
      } else {
        // add cedarLogs
        if (
          carrying + this.settingsStore.cedarGainedPerChop >=
          this.calculateCarryingCapacity()
        ) {
          break;
        } else {
          rewards.cedarLogs += this.settingsStore.cedarGainedPerChop;
          carrying += this.settingsStore.cedarGainedPerChop;
        }
      }
    }
    // lay out rewards
    // for loop
    //
    // check for attack

    // same as forage, plus
    // rare chance for Pine Sap
    // eagle instead of wolf, they steal Pine Sap if you don't have bow/arrow
    // each chop uses item's durability, when no durability excursion is over
    // gain woddcutting skill points 0.01 per minute
    // your gain is increased by 10% of your skill point
    // at 50, you don't gain sp here
    this.skills;
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
          this.inventoryStore.stoneAxe++;
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
          this.inventoryStore.stonePickaxe++;
        }
        break;
      case 'copperCedarAxe':
        // craftCopperCedarAxeRequiredCopper
        // craftCopperCedarAxeRequiredCedar
        break;
      case 'copperCedarPickaxe':
        // craftCopperCedarPickaxeRequiredCopper
        // craftCopperCedarPickaxeRequiredCedar
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
}

export default new Simulator();

const copperCedarAxe: Item = {
  name: 'Copper Cedar Axe',
  durability: 60,
  actionKeys: ['chop'],
  actions: {
    chop: {
      type: 'meleeAttack',
      skill: 'woodcutting',
      name: 'Chop',
      actionPointDuration: 1,
      durabilityUsed: 1,
    },
  },
};
copperCedarAxe;

const copperSword: Item = {
  name: 'Copper Sword',
  durability: 80,
  actionKeys: ['swing'],
  actions: {
    swing: {
      type: 'meleeAttack',
      skill: 'swordsmanship',
      name: 'Swing',
      actionPointDuration: 2,
      durabilityUsed: 2,
    },
  },
  baseDamage: 8,
};
copperSword;

const woodcutting: Skill = {
  name: 'Woodcutting',
};
woodcutting;

export interface Item {
  name: string;
  durability: number;
  actionKeys: string[];
  actions: { [actionKey: string]: Action };
  baseDamage?: number;
}

interface Action {
  type: string;
  skill: string;
  name: string;
  actionPointDuration: number;
  durabilityUsed: number;
}

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
