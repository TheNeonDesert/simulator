<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          The Neon Desert Simulator
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
});
</script>
