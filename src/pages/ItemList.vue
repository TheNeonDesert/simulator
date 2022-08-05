<template>
  <div>
    <h6>Items</h6>
    <ul>
      <li>leather sack: {{ inventoryStore.leatherSack }}</li>
      <li>stone dagger: {{ inventoryStore.stoneDagger }}</li>
      <li v-for="item in inventoryStore.items" v-bind:key="item.name">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';

export default defineComponent({
  name: 'ItemList',
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
