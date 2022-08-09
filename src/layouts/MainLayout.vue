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
          <li>
            Only looks at first/top item for durability, move desired "active"
            item to be first of type to use
          </li>
          <li>Unlimited bags lead to unlimited carrying capacity</li>
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
    return {
      showInfoDialog: ref<boolean>(false),
    };
  },
});
</script>
