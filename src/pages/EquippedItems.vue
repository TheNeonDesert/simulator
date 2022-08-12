<template>
  <div class="q-ma-md">
    <h6>Equipped Items</h6>

    <q-list bordered separator>
      <q-item>
        <q-item-section>
          <q-item-label v-if="inventoryStore.equippedItemIds.axe !== null">{{
            getItemById(inventoryStore.equippedItemIds.axe)?.name
          }}</q-item-label>
          <q-item-label v-else>No Axe Equipped</q-item-label>
          <q-item-label caption>Axe</q-item-label>
          <q-icon
            name="logout"
            @click="unequipItem()"
            v-if="inventoryStore.equippedItemIds.axe !== null"
          /> </q-item-section
      ></q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { Item } from 'src/models/Item';

export default defineComponent({
  name: 'EquippedItems',
  setup() {
    return {
      inventoryStore: ref<InventoryStore>(null as unknown as InventoryStore),
    };
  },
  created: async function () {
    this.inventoryStore = useInventoryStore();
  },
  methods: {
    unequipItem: function () {
      console.log('unequipItem:');
    },
    getItemById: function (itemId: number): Item | void {
      if (this.inventoryStore.getItemById)
        return this.inventoryStore.getItemById(itemId);
    },
  },
});
</script>

<style scoped lang="scss">
.q-icon {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
</style>
