<template>
  <q-page class="q-pa-lg">
    <div v-if="editSettings">
      <div class="row q-mt-md">
        <div class="col-2">
          <q-btn label="save settings" @click="saveSettings" color="primary" />
        </div>
      </div>
      <edit-settings />
    </div>

    <div v-if="!editSettings">
      <div class="row q-mt-md">
        <div class="col-12 col-sm-2 q-mr-sm q-mb-sm">
          <q-btn
            label="edit settings"
            @click="editSettings = true"
            color="primary"
          >
            <q-tooltip> This will also reset the simulation </q-tooltip></q-btn
          >
        </div>
        <div class="col-12 col-sm-2 q-mr-sm q-mb-sm">
          <q-btn label="reset simulation" @click="reset" color="primary" />
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6 col-md-3 col-12">
          <avatar-stats />
        </div>
        <div class="col-sm-6 col-md-3 col-12">
          <resource-list />
        </div>
        <div class="col-sm-6 col-md-3 col-12">
          <inventory-list />
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6 col-md-3 col-12">
          <crafting-station />
        </div>

        <div class="col-sm-6 col-md-3 col-12">
          <gather-resources />
        </div>

        <div class="col-sm-6 col-md-3 col-12">
          <combat-encounters />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import simulatorService from '../services/simulator.service';
import EditSettings from './EditSettings.vue';
import InventoryList from './InventoryList.vue';
import ResourceList from './ResourceList.vue';
import AvatarStats from './AvatarStats.vue';
import CraftingStation from './CraftingStation.vue';
import GatherResources from './GatherResources.vue';
import CombatEncounters from './CombatEncounters.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    EditSettings,
    InventoryList,
    ResourceList,
    AvatarStats,
    CraftingStation,
    GatherResources,
    CombatEncounters,
  },
  setup() {
    return {
      started: ref<boolean>(true),
      editSettings: ref<boolean>(false),
    };
  },
  methods: {
    reset: function () {
      simulatorService.reset();
    },
    saveSettings: function () {
      this.reset();
      this.editSettings = false;
    },
  },
});
</script>

<style scoped lang="scss"></style>
