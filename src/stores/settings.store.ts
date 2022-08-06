import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsStore => ({
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
    chanceWolfAttackPerAction: 0.015,
    // Wilderness Item Bonuses
    additionalCapacityFromLeatherSack: 50,
    // Wilderness Item Requirements
    craftStoneDaggerRequiredStone: 10,
    craftLeatherSackRequiredPlantFiber: 5,
    craftLeatherSackRequiredWolfPelts: 2,
    craftStoneAxeRequiredPlantFiber: 4,
    craftStoneAxeRequiredStone: 10,
    craftStoneAxeRequiredSticks: 12,
    craftStonePickAxeRequiredPlantFiber: 4,
    craftStonePickAxeRequiredStone: 20,
    craftStonePickAxeRequiredSticks: 8,

    // Cedar Forest Resources
    startingCopperOre: 0,
    startingCedarLog: 0,
    // Cedar Forest Actions
    cedarLogGainedPerAction: 0.7,
    copperOreGainedPerAction: 0.55,
    pineTarGainedPerAction: 0.04,
    chanceEagleAttackPerAction: 0.015,
    // Cedar Forest Item Requirements
    craftCedarCopperAxeRequiredCopper: 0,
    craftCedarCopperAxeRequiredCedar: 0,
    craftCedarCopperPickaxeRequiredCopper: 0,
    craftCedarCopperPickaxeRequiredCedar: 0,

    // Copper Mine Resources
    chanceFindGemPerAction: 0.8,
    chanceKoboldAttackPerAction: 0.075,

    // Goblin Encampment
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
  craftLeatherSackRequiredWolfPelts: number;
  craftStoneAxeRequiredPlantFiber: number;
  craftStoneAxeRequiredStone: number;
  craftStoneAxeRequiredSticks: number;
  craftStonePickAxeRequiredPlantFiber: number;
  craftStonePickAxeRequiredStone: number;
  craftStonePickAxeRequiredSticks: number;

  // Cedar Forest Starting Resources
  startingCopperOre: number;
  startingCedarLog: number;
  // Cedar Forest Actions
  cedarLogGainedPerAction: number;
  copperOreGainedPerAction: number;
  pineTarGainedPerAction: number;
  chanceEagleAttackPerAction: number;
  // Cedar Forest Item Requirements
  craftCedarCopperAxeRequiredCopper: number;
  craftCedarCopperAxeRequiredCedar: number;
  craftCedarCopperPickaxeRequiredCopper: number;
  craftCedarCopperPickaxeRequiredCedar: number;

  // Copper
  chanceFindGemPerAction: number;

  chanceKoboldAttackPerAction: number;
}
