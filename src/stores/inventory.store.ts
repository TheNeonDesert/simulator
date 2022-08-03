import { defineStore } from 'pinia';
import { Item } from 'src/services/simulator.service';

export const useInventoryStore = defineStore('inventory', {
  state: (): InventoryStore => ({
    // carrying: 0,

    stone: 0,
    stick: 0,
    plantFiber: 0,
    apple: 0,
    wolfPelt: 0,

    stoneDagger: 0,
    leatherSack: 0,
    stoneAxe: 0,
    stonePickaxe: 0,

    cedarBow: 0,
    cedarCopperArrow: 0,

    // copperCedarAxes: [],
  }),
});

export interface InventoryStore {
  // carrying: number;

  stone: number;
  stick: number;
  plantFiber: number;
  apple: number;
  wolfPelt: number;

  stoneDagger: number;
  leatherSack: number;
  stoneAxe: number;
  stonePickaxe: number;

  cedarBow: number;
  cedarCopperArrow: number;

  // copperCedarAxes: Item[];
}
