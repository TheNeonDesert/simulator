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
          <q-item-section>
            <q-checkbox
              @update:model-value="showTooltipsUpdated"
              :model-value="simulationStore.showTooltips"
              label="Show Tooltips"
          /></q-item-section>
        </q-item>
        <!-- TODO implement autoHealAvatar -->
        <q-item clickable>
          <q-item-section
            ><q-checkbox
              @update:model-value="autoHealAvatarUpdated"
              :model-value="simulationStore.autoHealAvatar"
              label="Auto Heal Avatar"
          /></q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section
            ><q-checkbox
              @update:model-value="autoRepairItemsUpdated"
              :model-value="simulationStore.autoRepairItems"
              label="Auto Repair Items"
          /></q-item-section>
        </q-item>

        <q-separator dark />
        <q-item clickable v-close-popup @click="$router.push('/settings')">
          <q-item-section>Settings</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="reset">
          <q-item-section>Reset</q-item-section>
        </q-item>
        <q-separator dark />
        <q-item clickable v-close-popup @click="showInfoDialog = true">
          <q-item-section>About</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="showVersionHistory = true">
          <q-item-section>Version 0.0.3</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
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
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import simulatorService from '../services/simulator.service';

export default defineComponent({
  name: 'MainMenu',
  components: {
    InfoDialogModal,
    VersionHistoryModal,
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
      showInfoDialog: ref<boolean>(false),
      showVersionHistory: ref<boolean>(false),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
  },
  methods: {
    showTooltipsUpdated: function (newVal: boolean) {
      this.simulationStore.showTooltips = newVal;
    },
    autoHealAvatarUpdated: function (newVal: boolean) {
      this.simulationStore.autoHealAvatar = newVal;
    },
    autoRepairItemsUpdated: function (newVal: boolean) {
      this.simulationStore.autoRepairItems = newVal;
    },
    reset: function () {
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
