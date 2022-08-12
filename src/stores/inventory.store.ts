import { defineStore } from 'pinia';
import { Item } from 'src/models/Item';

export const useInventoryStore = defineStore('inventory', {
  // maybe instead of this, just move the actual objects around...
  // TODO have equipped and unequipped items
  state: (): InventoryStore => ({
    items: [],
    equippedItemIds: {
      axe: null,
      pickaxe: null,
      meleeWeapon: null,
      rangedWeapon: null,
    },
  }),
  getters: {
    getItemById: (state) => {
      return (itemId: number) => state.items.find((item) => item.id === itemId);
    },
  },
});

export interface InventoryStore {
  items: Item[];
  equippedItemIds: {
    axe: number | null;
    pickaxe: number | null;
    meleeWeapon: number | null;
    rangedWeapon: number | null;
  };

  getItemById?: (itemId: number) => Item; // TODO make a SO post about how to clean this up..
}
