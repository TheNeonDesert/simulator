<template>
  <div class="row">
    <index-page-card><gather-resources /></index-page-card>
    <index-page-card><resource-list /></index-page-card>
    <index-page-card><equipped-items /></index-page-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EquippedItems from './PageSectionCards/EquippedItems.vue';
import IndexPageCard from './PageSectionCards/IndexPageCard.vue';
import GatherResources from './PageSectionCards/GatherResources.vue';
import ResourceList from './PageSectionCards/ResourceList.vue';

export default defineComponent({
  name: 'GatherPage',
  components: {
    EquippedItems,
    IndexPageCard,
    GatherResources,
    ResourceList,
  },
});
</script>

<style scoped lang="scss"></style>
