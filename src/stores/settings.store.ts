import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsStore => ({
    actionsPerMinute: 0,
    woodProducedPerAction: 0,
    durabilityUsedPerAction: 0,
    minutesPerEnounter: 0,
    numberEncounters: 0,
    costOfWoodToCraftAxe: 0,
    durabilityPtsPerAxe: 0,
    startingCedar: 0,
    startingCedarCopperAxes: 0,
  }),
});

export interface SettingsStore {
  [key: string]: number;
  actionsPerMinute: number;
  woodProducedPerAction: number;
  durabilityUsedPerAction: number;
  minutesPerEnounter: number;
  numberEncounters: number;
  costOfWoodToCraftAxe: number;
  durabilityPtsPerAxe: number;
  startingCedar: number;
  startingCedarCopperAxes: number;
}
