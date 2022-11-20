<template>
  <div :class="{ mobile: mobile }">
    <q-icon name="img:icons/menu-icon.png"></q-icon>
    <span v-if="!mobile">Menu</span>
    <q-menu
      :anchor="mobile ? 'bottom start' : 'center right'"
      class="bg-black text-white"
    >
      <q-list>
        <q-item clickable>
          <q-item-section
            ><q-checkbox
              @update:model-value="autoRepairItemsUpdated"
              :model-value="simulationStore.autoRepairItems"
              label="Auto Repair Items"
          /></q-item-section>
        </q-item>

        <q-separator dark />
        <!-- <q-item clickable v-close-popup @click="$router.push('/settings')">
          <q-item-section>Settings</q-item-section>
        </q-item> -->
        <q-item clickable v-close-popup @click="reset">
          <q-item-section>Reset</q-item-section>
        </q-item>
        <q-separator dark />
        <q-item clickable v-close-popup @click="showTutorialModal = true">
          <q-item-section>Welcome</q-item-section>
        </q-item>
        <!-- <q-item clickable v-close-popup @click="showVersionHistory = true">
          <q-item-section>v0.0.3</q-item-section>
        </q-item> -->
      </q-list>
    </q-menu>
  </div>
  <welcome-modal
    :showTutorialModal="showTutorialModal"
    @update="showTutorialModal = $event"
  />
  <!-- <version-history-modal
    :showVersionHistory="showVersionHistory"
    @update="showVersionHistory = $event"
  /> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import VersionHistoryModal from '../modals/VersionHistoryModal.vue';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import simulatorService from '../services/simulator.service';
import Utils from 'src/services/utils';
import { ActionLogCategory } from 'src/models/ActionLog';
import WelcomeModal from '../modals/WelcomeModal.vue';

export default defineComponent({
  name: 'MainMenu',
  components: {
    // VersionHistoryModal,
    WelcomeModal,
  },
  props: {
    mobile: {
      required: false,
      type: Boolean,
    },
  },
  setup() {
    return {
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
      // showVersionHistory: ref<boolean>(false),
      showTutorialModal: ref<boolean>(false),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
    const seen = localStorage.getItem('seenWelcomeV003');
    if (!seen) {
      this.showTutorialModal = true;
    }
  },
  methods: {
    autoRepairItemsUpdated: function (newVal: boolean) {
      this.simulationStore.autoRepairItems = newVal;
    },
    reset: function () {
      // TODO do a double check modal, are you sure?
      this.$router.push('/');
      Utils.info('Simulation reset', ActionLogCategory.world);
      simulatorService.reset();
    },
  },
});
</script>

<style lang="scss" scoped>
// non mobile styles from from NavigationLinks.vue
.mobile {
  .q-icon {
    font-size: 40px;
    cursor: pointer;
  }
}

:deep(.q-checkbox__bg) {
  border-color: $white;
}
</style>
