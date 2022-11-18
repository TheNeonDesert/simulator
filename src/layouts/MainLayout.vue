<template>
  <q-layout view="hHh LpR fFf" class="default-text">
    <header-section />
    <navigation-links />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderSection from './HeaderSection.vue';
import NavigationLinks from './NavigationLinks.vue';

export default defineComponent({
  name: 'MainLayout',
  components: { HeaderSection, NavigationLinks },
  setup() {
    // TODO setup site-wide resizer capturer and set screen size to xs, sm, md, lg, etc... and also set height
    // then can customize UI all around based on that
    window.addEventListener('resize', () => {
      // console.log('resized'); -> // update store
    });

    // TODO add site analytics
    // TODO modal check for
    // save a cookie or whatever
    // Want a quick tour? You can always view the tutorial again from help page - Yes or Nah
    // not real crypto, simulation for a game I'm building
    // in the real game for ex all transactions take time and crypto gas or other real tokens
    // here you can do a 12 hour job in 1 second and nothing is tied to any crypto in any way
  },
});
</script>

<style lang="scss" scoped></style>
