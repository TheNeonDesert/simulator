<template>
  <q-page class="q-pa-lg">
    <div v-if="editSettings">
      <div class="row q-ma-md">
        <q-btn label="save settings" @click="saveSettings" color="primary" />
      </div>
      <edit-settings />
    </div>

    <div v-if="!editSettings">
      <div class="row q-ma-md">
        <div class="col-12 col-sm-2 q-mr-sm q-mb-sm">
          <q-btn
            label="edit settings"
            @click="editSettings = true"
            color="primary"
          >
            <q-tooltip v-if="simulationStore.showTooltips">
              This will also reset the simulation
            </q-tooltip></q-btn
          >
        </div>
        <div class="col-12 col-sm-2 q-mr-sm q-mb-sm">
          <q-btn label="reset simulation" @click="reset" color="primary" />
        </div>
        <div>
          <q-checkbox
            @update:model-value="showTooltipsUpdated"
            :model-value="simulationStore.showTooltips"
            label="Show Tooltips"
          />
          <!-- TODO implement autoHealAvatar -->
          <q-checkbox
            @update:model-value="autoHealAvatarUpdated"
            :model-value="simulationStore.autoHealAvatar"
            label="Auto Heal Avatar"
          />
          <!-- TODO implement autoRepairItems -->
          <q-checkbox
            @update:model-value="autoRepairItemsUpdated"
            :model-value="simulationStore.autoRepairItems"
            label="Auto Repair Items"
          />
        </div>
      </div>

      <div class="row">
        <index-page-card><avatar-stats /></index-page-card>
        <index-page-card><resource-list /></index-page-card>
        <index-page-card><equipped-items /></index-page-card>
        <index-page-card><inventory-list /></index-page-card>
      </div>

      <div class="row">
        <index-page-card><crafting-station /></index-page-card>
        <index-page-card><gather-resources /></index-page-card>
        <index-page-card><combat-encounters /></index-page-card>
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
import EquippedItems from './EquippedItems.vue';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import IndexPageCard from './IndexPageCard.vue';

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
    EquippedItems,
    IndexPageCard,
  },
  setup() {
    return {
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
      started: ref<boolean>(true),
      editSettings: ref<boolean>(false),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
  },
  methods: {
    reset: function () {
      simulatorService.reset();
    },
    saveSettings: function () {
      this.reset();
      this.editSettings = false;
    },
    showTooltipsUpdated: function (newVal: boolean) {
      this.simulationStore.showTooltips = newVal;
    },
    autoHealAvatarUpdated: function (newVal: boolean) {
      this.simulationStore.autoHealAvatar = newVal;
    },
    autoRepairItemsUpdated: function (newVal: boolean) {
      this.simulationStore.autoRepairItems = newVal;
    },
  },
});
</script>

<style scoped lang="scss">
.q-page {
  background-color: $page-backround;
}
index-page-card > * {
  margin: 20px;
}
</style>
