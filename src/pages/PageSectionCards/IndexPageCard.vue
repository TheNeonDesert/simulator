<template>
  <!-- refactor these into the owner/caller, so it can be different amount of columns for each page -->
  <div class="col-sm-6 col-md-3 col-12">
    <div class="index-card q-ma-md">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPageCard',
});
</script>

<style scoped lang="scss">
.index-card {
  // background-color: $black;
  box-shadow: 0 2px 37px 0 rgba(87, 152, 181, 0.6);
  border: solid 1px var(--teal-500);

  &::v-deep > * {
    padding: 20px;
  }
}
</style>
