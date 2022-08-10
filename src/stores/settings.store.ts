import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsStore => ({
    // TODO re-org how this is all setup

    // General
    carryingCapacity: 50,

    // Wilderness Resources
    startingStone: 0,
    startingStick: 0,
    startingPlantFiber: 0,
    startingApple: 0,
    // Wilderness Actions
    stickGainedPerAction: 0.8,
    stoneGainedPerAction: 0.65,
    plantFiberGainedPerAction: 0.25,
    appleGainedPerAction: 0.08,
    chanceWolfAttackPerAction: 0.035,
    // Wilderness Item Bonuses
    additionalCapacityFromLeatherSack: 50,
    // Wilderness Item Requirements
    craftStoneDaggerRequiredStone: 10,
    craftLeatherSackRequiredPlantFiber: 5,
    craftLeatherSackRequiredWolfPelt: 2,
    craftStoneAxeRequiredPlantFiber: 4,
    craftStoneAxeRequiredStone: 10,
    craftStoneAxeRequiredStick: 12,
    craftStonePickAxeRequiredPlantFiber: 4,
    craftStonePickAxeRequiredStone: 20,
    craftStonePickAxeRequiredStick: 8,

    // Cedar Forest Resources
    startingCopperOre: 0,
    startingCedarLog: 0,
    // Cedar Forest Actions
    cedarLogGainedPerAction: 0.7,
    copperOreGainedPerAction: 0.55,
    chanceFindPineTarPerAction: 0.02,
    chanceEagleAttackPerAction: 0.015,
    // Cedar Forest Item Requirements
    // craftCedarCopperAxeRequiredCopperOre: 0,
    // craftCedarCopperAxeRequiredCedar: 0,
    // craftCedarCopperPickaxeRequiredCopperOre: 0,
    // craftCedarCopperPickaxeRequiredCedar: 0,

    // Copper Mine Resources
    chanceFindRubyPerAction: 0.002,
    chanceKoboldAttackPerAction: 0.075,

    // Goblin Encampment

    // Tier 0
    craftSlingRequiredPlantFiber: 20,
    craftSlingRequiredWolfPelt: 12,

    // Tier 1
    craftCedarCopperAxeRequiredCopperOre: 20,
    craftCedarCopperAxeRequiredCedarLog: 30,
    craftCedarCopperAxeRequiredWolfPelt: 2,

    craftCedarCopperPickaxeRequiredCopperOre: 30,
    craftCedarCopperPickaxeRequiredCedarLog: 20,
    craftCedarCopperPickaxeRequiredWolfPelt: 2,

    craftCopperSwordRequiredCopperOre: 25,
    craftCopperSwordRequiredWolfPelt: 8,
    craftCopperSwordRequiredPlantFiber: 12,
  }),
});

export interface SettingsStore {
  [key: string]: number;
  // General
  carryingCapacity: number;
  // Wilderness Starting Resources
  startingStone: number;
  startingStick: number;
  startingPlantFiber: number;
  startingApple: number;
  // Wilderness Actions
  stickGainedPerAction: number;
  stoneGainedPerAction: number;
  plantFiberGainedPerAction: number;
  appleGainedPerAction: number;
  chanceWolfAttackPerAction: number;
  // Wilderness Item Bonuses
  additionalCapacityFromLeatherSack: number;
  // Wilderness Item Requirements
  craftStoneDaggerRequiredStone: number;
  craftLeatherSackRequiredPlantFiber: number;
  craftLeatherSackRequiredWolfPelt: number;
  craftStoneAxeRequiredPlantFiber: number;
  craftStoneAxeRequiredStone: number;
  craftStoneAxeRequiredStick: number;
  craftStonePickAxeRequiredPlantFiber: number;
  craftStonePickAxeRequiredStone: number;
  craftStonePickAxeRequiredStick: number;

  // Cedar Forest Starting Resources
  startingCopperOre: number;
  startingCedarLog: number;
  // Cedar Forest Actions
  cedarLogGainedPerAction: number;
  copperOreGainedPerAction: number;
  chanceFindPineTarPerAction: number;
  chanceEagleAttackPerAction: number;

  // Copper
  chanceFindRubyPerAction: number;

  chanceKoboldAttackPerAction: number;

  // Tier 0
  craftSlingRequiredPlantFiber: number;
  craftSlingRequiredWolfPelt: number;

  // Tier 1
  craftCedarCopperAxeRequiredCopperOre: number;
  craftCedarCopperAxeRequiredCedarLog: number;
  craftCedarCopperAxeRequiredWolfPelt: number;

  craftCedarCopperPickaxeRequiredCopperOre: number;
  craftCedarCopperPickaxeRequiredCedarLog: number;
  craftCedarCopperPickaxeRequiredWolfPelt: number;

  craftCopperSwordRequiredCopperOre: number;
  craftCopperSwordRequiredWolfPelt: number;
  craftCopperSwordRequiredPlantFiber: number;
}
