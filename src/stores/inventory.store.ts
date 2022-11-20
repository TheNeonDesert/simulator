import { defineStore } from 'pinia';
import { Item } from 'src/models/Item';

export const useInventoryStore = defineStore('inventory', {
  state: (): InventoryStore => ({
    items: [],
  }),
  getters: {
    getItemById: (state) => {
      return (itemId: number): Item | undefined =>
        state.items.find((item) => item.id === itemId);
    },
  },
});

export interface InventoryStore {
  items: Item[];
  getItemById?: (itemId: number) => Item; // TODO make a SO post about how to clean this up..
}
