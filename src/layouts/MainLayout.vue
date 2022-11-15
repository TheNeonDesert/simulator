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
    // TODO add site analytics
    // TODO modal check for
    // save a cookie or whatever
    // Want a quick tour? You can always view the tutorial again from help page - Yes or Nah
    // not real crypto, simulation for a game I'm building
    // in the real game for ex all transactions take time and crypto gas or other real tokens
    // here you can do a 12 hour job in 1 second and nothing is tied to any crypto in any way
  },
  // created: function () {
  //   console.log('MainLayout created:');
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   var _paq = ((window as any)._paq = (window as any)._paq || []);
  //   /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  //   _paq.push(['trackPageView']);
  //   _paq.push(['enableLinkTracking']);
  //   (function () {
  //     var u = 'http://ec2-54-162-66-86.compute-1.amazonaws.com/matomo/';
  //     _paq.push(['setTrackerUrl', u + 'matomo.php']);
  //     _paq.push(['setSiteId', '1']);
  //     var d = document,
  //       g = d.createElement('script'),
  //       s = d.getElementsByTagName('script')[0];
  //     g.async = true;
  //     g.src = u + 'matomo.js';
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     (s.parentNode as any).insertBefore(g, s);
  //   })();
  // },
});
</script>

<style lang="scss" scoped></style>
