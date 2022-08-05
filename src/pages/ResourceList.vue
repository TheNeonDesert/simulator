<template>
  <div>
    <h6>Resources</h6>
    <ul>
      <li>stone: {{ toTwoDecimal(inventoryStore.stone) }}</li>
      <li>stick: {{ toTwoDecimal(inventoryStore.stick) }}</li>
      <li>
        plant fiber:
        {{ toTwoDecimal(inventoryStore.plantFiber) }}
      </li>
      <li>apple: {{ toTwoDecimal(inventoryStore.apple) }}</li>
      <li>wolf pelt: {{ inventoryStore.wolfPelt }}</li>
    </ul>
    <ul>
      <li>cedar log: {{ inventoryStore.cedarLog }}</li>
      <li>copper: 0</li>
      <li>pine tar: 0</li>
      <li>gems: 0</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import Utils from 'src/services/utils';

export default defineComponent({
  name: 'ResourceList',
  setup() {
    return {
      inventoryStore: ref<InventoryStore>(null as unknown as InventoryStore),
    };
  },
  created: async function () {
    this.inventoryStore = useInventoryStore();
  },
  methods: {
    toTwoDecimal: function (number: number) {
      return Utils.toTwoDecimal(number);
    },
  },
});
</script>

<style scoped lang="scss"></style>
