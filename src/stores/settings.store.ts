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

    // Cedar Forest
    chanceEagleAttackPerAction: 0,
    cedarGainedPerChop: 0,
  }),
});

export interface SettingsStore {
  [key: string]: number;
  // General
  carryingCapacity: number;
  // Wilderness Resources
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

  // Cedar Forest
  chanceEagleAttackPerAction: number;
  cedarGainedPerChop: number;
}
