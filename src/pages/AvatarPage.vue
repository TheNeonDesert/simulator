<template>
  <div class="row">
    <index-page-card><avatar-stats /></index-page-card>
    <index-page-card><equipped-items /></index-page-card>
    <index-page-card><inventory-list /></index-page-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InventoryList from './PageSectionCards/InventoryList.vue';
import AvatarStats from './PageSectionCards/AvatarStats.vue';
import EquippedItems from './PageSectionCards/EquippedItems.vue';
import IndexPageCard from './PageSectionCards/IndexPageCard.vue';

export default defineComponent({
  name: 'AvatarPage',
  components: {
    InventoryList,
    AvatarStats,
    EquippedItems,
    IndexPageCard,
  },
});
</script>

<style scoped lang="scss"></style>
