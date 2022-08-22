import { defineStore } from 'pinia';
import { Item } from 'src/models/Item';
import _ from 'underscore';

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
      return (itemId: number): Item | undefined =>
        state.items.find((item) => item.id === itemId);
    },
    isItemEquipped: (state) => {
      return (itemIdToCheck: number): boolean => {
        let isEquipped = false;
        _.each(state.equippedItemIds, (equippedItemId) => {
          if (itemIdToCheck === equippedItemId) {
            isEquipped = true;
          }
        });
        return isEquipped;
      };
    },
  },
});

export interface InventoryStore {
  items: Item[];
  equippedItemIds: { [itemName: string]: number | null };
  // {
  //   axe: number | null;
  //   pickaxe: number | null;
  //   meleeWeapon: number | null;
  //   rangedWeapon: number | null;
  // };

  getItemById?: (itemId: number) => Item; // TODO make a SO post about how to clean this up..
  isItemEquipped?: (itemIdToCheck: number) => boolean;
}

// TODO okay for equipped items, move from here to Avatar store
// then do the layout work/feel differently than inventory, so easy for user to see what's up
// boxes for each slot, empty or whatever it is...
// on UI show icon label "equipped *" if it's equipped
