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
      </div>

      <router-view />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import simulatorService from '../services/simulator.service';
import EditSettings from './EditSettings.vue';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

export default defineComponent({
  name: 'IndexPage',
  components: {
    EditSettings,
  },
  setup() {
    return {
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
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
  },
});
</script>

<style scoped lang="scss">
.q-page {
  background-color: $page-backround;
}
</style>
