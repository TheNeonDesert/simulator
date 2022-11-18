<template>
  <q-page class="q-pa-lg">
    <router-view />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
});
</script>

<style scoped lang="scss">
.q-page {
  background-color: $page-backround;
}
</style>
