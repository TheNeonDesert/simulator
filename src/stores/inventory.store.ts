import { defineStore } from 'pinia';
import { Item } from 'src/models/Item';

export const useInventoryStore = defineStore('inventory', {
  state: (): InventoryStore => ({
    items: [],
  }),
});

export interface InventoryStore {
  items: Item[];
}
