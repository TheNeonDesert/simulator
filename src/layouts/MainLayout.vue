<template>
  <q-layout view="hHh LpR fFf" class="default-text">
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

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      elevated
      mini
      behavior="desktop"
      persistent
      no-swipe-backdrop
      no-swipe-open
      no-swipe-close
      class="bg-black side-menu"
      v-if="$q.screen.gt.sm"
    >
      <div class="side-menu">
        <div>
          <q-icon name="person"></q-icon>
          <span style="margin-top: -6px">Avatar</span>
        </div>
        <div>
          <q-icon name="img:icons/hammer-anvil-icon.png"></q-icon>
          <span>Crafting</span>
        </div>
        <div>
          <q-icon name="img:icons/pickaxe-icon.png"></q-icon>
          <span>Gather</span>
        </div>
        <div>
          <q-icon name="img:icons/sword-icon.png"></q-icon>
          <span>Combat</span>
        </div>
      </div>
    </q-drawer>

    <q-footer elevated class="bg-black" v-if="$q.screen.lt.md">
      <!-- <q-toolbar> -->
      <!-- <q-toolbar-title>Footer</q-toolbar-title> -->
      <div class="footer-menu">
        <div>
          <q-icon name="person"></q-icon>
          <span>Avatar</span>
        </div>
        <div>
          <q-icon name="img:icons/hammer-anvil-icon.png"></q-icon>
          <span>Crafting</span>
        </div>
        <div>
          <q-icon name="img:icons/pickaxe-icon.png"></q-icon>
          <span>Gather</span>
        </div>
        <div>
          <q-icon name="img:icons/sword-icon.png"></q-icon>
          <span>Combat</span>
        </div>
      </div>
      <!-- </q-toolbar> -->
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <info-dialog-modal
    :showInfoDialog="showInfoDialog"
    @update="showInfoDialog = $event"
  />
  <version-history-modal
    :showVersionHistory="showVersionHistory"
    @update="showVersionHistory = $event"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InfoDialogModal from '../modals/InfoDialogModal.vue';
import VersionHistoryModal from '../modals/VersionHistoryModal.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    InfoDialogModal,
    VersionHistoryModal,
  },
  setup() {
    // TODO add site analytics
    return {
      showInfoDialog: ref<boolean>(false),
      showVersionHistory: ref<boolean>(false),
      leftDrawerOpen: ref<boolean>(true),
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

<style lang="scss" scoped>
.q-header {
  background-color: $black;
  box-shadow: 0 2px 37px 0 rgba(87, 152, 181, 0.6);
  border: solid 1px var(--teal-500);
}

.side-menu {
  .q-icon {
    margin-top: 20px;
    margin-left: 8px;
    font-size: 40px;
    cursor: pointer;
  }

  span {
    display: block;
    text-align: center;
    font-size: 12px;
  }
}

.footer-menu {
  display: flex;
  height: 70px;
  justify-content: space-evenly;
  align-items: center;

  > div {
    .q-icon {
      font-size: 32px;
      cursor: pointer;
    }

    span {
      display: block;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
