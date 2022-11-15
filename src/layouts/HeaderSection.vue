<template>
  <q-header elevated :class="{ mobile: $q.screen.lt.md }">
    <q-toolbar class="caption-text white">
      <q-toolbar-title>
        <q-img
          src="../assets/TND_OnBlack.png"
          style="width: 200px; margin: 10px; cursor: pointer"
          @click="$router.push('/')"
        />
        <span>SIMULATOR</span>
      </q-toolbar-title>
      <main-menu v-if="$q.screen.lt.md" mobile />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainMenu from './MainMenu.vue';

export default defineComponent({
  name: 'HeaderSection',
  components: {
    MainMenu,
  },
});
</script>

<style lang="scss" scoped>
.q-header {
  background-color: $black;
  box-shadow: 0 2px 37px 0 rgba(87, 152, 181, 0.6);
  border: solid 1px var(--teal-500);

  &.mobile {
    span {
      position: absolute;
      top: 54px;
      left: 135px;
      font-size: 12px;
    }
  }
}
</style>
