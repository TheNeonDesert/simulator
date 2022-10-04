<template>
  <q-layout view="lHh Lpr lFf" class="default-text">
    <q-header elevated>
      <q-toolbar class="caption-text white">
        <q-toolbar-title>
          <q-img
            src="../assets/TND_OnBlack.png"
            style="width: 200px; margin: 20px" />
          SIMULATOR
          <q-icon
            name="help"
            @click="showInfoDialog = true"
            class="cursor-pointer"
            style="font-size: 24px"
        /></q-toolbar-title>
        <span
          @click="showVersionHistory = true"
          style="text-decoration: underline; cursor: pointer"
          >0.0.2</span
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <q-dialog v-model="showInfoDialog">
    <q-card>
      <q-card-section class="q-pt-none">
        <h6>This simulator is awesome</h6>
        <p>To be built next</p>
        <ul>
          <li>Stats, str dex int</li>
          <li>Skills, woodcutting mining etc</li>
          <li>Avatar recompile</li>
          <li>Neon cost</li>
        </ul>
        <p>Current limitations or issues</p>
        <ul>
          <li>
            Only supports one avatar and all stats/items/etc are for that one
            avatar
          </li>
          <li>Unlimited bags lead to unlimited carrying capacity</li>
        </ul>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showVersionHistory">
    <q-card>
      <q-card-section>
        <h6>0.0.2</h6>
        <ul>
          <li>new styling and layout</li>
          <li>more info for user on what's going on and what to do</li>
          <li>equip items by slot</li>
          <li>auto heal and auto repair</li>
        </ul>
        <h6>0.0.1</h6>
        <ul>
          <li>initial release</li>
          <li>basic resources, items, crafting, durability</li>
          <li>wilderness, cedar forest, copper ore, goblin encampment</li>
        </ul>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.q-header {
  background-color: $black;
  box-shadow: 0 2px 37px 0 rgba(87, 152, 181, 0.6);
  border: solid 1px var(--teal-500);
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    // TODO add site analytics
    return {
      showInfoDialog: ref<boolean>(false),
      showVersionHistory: ref<boolean>(false),
    };
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
