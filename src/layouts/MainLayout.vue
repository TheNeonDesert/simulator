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
  // setup() {
  // TODO setup site-wide resizer capturer and set screen size to xs, sm, md, lg, etc... and also set height
  // then can customize UI all around based on that
  // window.addEventListener('resize', () => {
  // console.log('resized'); -> // update store
  // screen width:     mobile, tablet, laptop, huge, and short versions for each
  // just save it to a store, and make it easy to consume
  // });

  // TODO add site analytics
  // },
});
</script>

<style lang="scss" scoped></style>
