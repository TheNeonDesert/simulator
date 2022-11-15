<template>
  <div class="row">
    <index-page-card><crafting-station /></index-page-card>
    <index-page-card><resource-list /></index-page-card>
    <index-page-card><equipped-items /></index-page-card>
    <index-page-card><inventory-list /></index-page-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InventoryList from './PageSectionCards/InventoryList.vue';
import ResourceList from './PageSectionCards/ResourceList.vue';
import CraftingStation from './PageSectionCards/CraftingStation.vue';
import IndexPageCard from './PageSectionCards/IndexPageCard.vue';
import EquippedItems from './PageSectionCards/EquippedItems.vue';

export default defineComponent({
  name: 'CraftingPage',
  components: {
    IndexPageCard,
    InventoryList,
    ResourceList,
    CraftingStation,
    EquippedItems,
  },
});
</script>

<style scoped lang="scss"></style>
