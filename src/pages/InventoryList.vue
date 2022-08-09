<template>
  <div>
    <h6>Inventory</h6>
    <ul v-if="inventoryStore.items && inventoryStore.items.length > 0">
      <li v-for="item in inventoryStore.items" v-bind:key="item.name">
        {{ item.name }} {{ (item.durability / item.startingDurability) * 100 }}%
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
});
</script>

<style scoped lang="scss"></style>
