<template>
  <div>
    <h6>Inventory</h6>
    <!-- TODO group by type -->
    <ul v-if="inventoryStore.items && inventoryStore.items.length > 0">
      <li v-for="(item, idx) in inventoryStore.items" v-bind:key="item.name">
        {{ item.id }}: {{ item.name }}
        <i v-if="item.durability - item.startingDurability"
          >{{ (item.durability / item.startingDurability) * 100 }}%</i
        >
        <q-icon
          v-if="idx > 0"
          class="cursor-pointer"
          name="keyboard_double_arrow_up"
          @click="moveItemUp(item)"
        ></q-icon>
        <q-icon
          v-if="idx < inventoryStore.items.length - 1"
          class="cursor-pointer"
          name="keyboard_double_arrow_down"
          @click="moveItemDown(item)"
        ></q-icon>
        <q-icon
          class="cursor-pointer"
          name="delete"
          @click="tossItem(item)"
        ></q-icon>
      </li>
    </ul>
    <ul v-else>
      none yet... try crafting
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { Item } from 'src/models/Item';

export default defineComponent({
  name: 'InventoryList',
  setup() {
    return {
      inventoryStore: ref<InventoryStore>(null as unknown as InventoryStore),
    };
  },
  created: async function () {
    this.inventoryStore = useInventoryStore();
  },
  methods: {
    moveItemUp: async function (item: Item) {
      for (let i = 0; i < this.inventoryStore.items.length; i++) {
        if (this.inventoryStore.items[i].id === item.id) {
          if (i > 0) {
            const itemToMove = this.inventoryStore.items[i];
            const itemBeingReplaced = this.inventoryStore.items[i - 1];
            this.inventoryStore.items[i - 1] = itemToMove;
            this.inventoryStore.items[i] = itemBeingReplaced;
          }
          return;
        }
      }
    },
    moveItemDown: async function (item: Item) {
      for (let i = 0; i < this.inventoryStore.items.length; i++) {
        if (this.inventoryStore.items[i].id === item.id) {
          if (i < this.inventoryStore.items.length - 1) {
            const itemToMove = this.inventoryStore.items[i];
            const itemBeingReplaced = this.inventoryStore.items[i + 1];
            this.inventoryStore.items[i + 1] = itemToMove;
            this.inventoryStore.items[i] = itemBeingReplaced;
          }
          return;
        }
      }
    },
    tossItem: async function (item: Item) {
      for (let i = 0; i < this.inventoryStore.items.length; i++) {
        if (this.inventoryStore.items[i].id === item.id) {
          this.inventoryStore.items.splice(i, 1);
          return;
        }
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
