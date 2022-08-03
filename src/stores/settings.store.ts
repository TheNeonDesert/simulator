import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsStore => ({
    carryingCapacity: 0,

    // Wilderness
    startingStone: 0,
    startingStick: 0,
    startingPlantFiber: 0,
    startingApple: 0,

    stickGainedPerAction: 0,
    stoneGainedPerAction: 0,
    plantFiberGainedPerAction: 0,
    appleGainedPerAction: 0,

    chanceWolfAttackPerAction: 0,

    craftStoneDaggerRequiredStone: 0,

    additionalCapacityFromLeatherSack: 50, // TODO move these numbers
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

    // actionsPerMinute: 0,
    // woodProducedPerAction: 0,
    // durabilityUsedPerAction: 0,
    // minutesPerEnounter: 0,
    // numberEncounters: 0,
    // costOfWoodToCraftAxe: 0,
    // durabilityPtsPerAxe: 0,
    // startingCedar: 0,
    // startingCedarCopperAxes: 0,
  }),
});

export interface SettingsStore {
  carryingCapacity: number;

  // Wilderness
  startingStone: number;
  startingStick: number;
  startingPlantFiber: number;
  startingApple: number;

  stickGainedPerAction: number;
  stoneGainedPerAction: number;
  plantFiberGainedPerAction: number;
  appleGainedPerAction: number;

  chanceWolfAttackPerAction: number;

  craftStoneDaggerRequiredStone: number;

  additionalCapacityFromLeatherSack: number;
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

  // [key: string]: number;
  // actionsPerMinute: number;
  // woodProducedPerAction: number;
  // durabilityUsedPerAction: number;
  // minutesPerEnounter: number;
  // numberEncounters: number;
  // costOfWoodToCraftAxe: number;
  // durabilityPtsPerAxe: number;
  // startingCedar: number;
  // startingCedarCopperAxes: number;
}
