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
      <q-card-section>
        <div class="text-h6">The Neon Desert Simulator</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        This simulator is awesome.
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
