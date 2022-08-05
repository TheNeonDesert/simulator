<template>
  <div>
    <h6>Items</h6>
    <ul>
      <li>leather sack: {{ inventoryStore.leatherSack }}</li>
      <li>stone dagger: {{ inventoryStore.stoneDagger }}</li>
      <li>stone axe: {{ inventoryStore.stoneAxe }}</li>
      <li>stone pickaxe: {{ inventoryStore.stonePickaxe }}</li>
    </ul>
    <ul>
      <li>cedar copper axe: 0</li>
      <li>cedar copper pickaxe: 0</li>
      <li>cedar copper sword: 0</li>
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
