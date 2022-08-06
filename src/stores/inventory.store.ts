import { defineStore } from 'pinia';
import { Item } from 'src/models/Item';

export const useInventoryStore = defineStore('inventory', {
  state: (): InventoryStore => ({
    stone: 0,
    stick: 0,
    plantFiber: 0,
    apple: 0,
    wolfPelt: 0,
    copperOre: 0,
    cedarLog: 0,
    eagleFeather: 0,
    pineTar: 0,
    gem: 0,

    stoneDagger: 0,
    leatherSack: 0,
    // stoneAxe: 0,
    // stonePickaxe: 0,

    // cedarBow: 0,
    cedarCopperArrow: 0,

    items: [],
  }),
});

export interface InventoryStore {
  [key: string]: number | Item[];

  stone: number;
  stick: number;
  plantFiber: number;
  apple: number;
  wolfPelt: number;
  copperOre: number;
  cedarLog: number;
  eagleFeather: number;
  pineTar: number;
  gem: number;

  stoneDagger: number;
  leatherSack: number;
  // stoneAxe: number;
  // stonePickaxe: number;

  // cedarBow: number;
  cedarCopperArrow: number;

  items: Item[];
}
