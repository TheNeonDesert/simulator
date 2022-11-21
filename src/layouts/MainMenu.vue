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
        <q-item clickable v-close-popup @click="confirmResetModal = true">
          <q-item-section>Reset</q-item-section>
        </q-item>
        <q-separator dark />
        <q-item clickable v-close-popup @click="showWelcomeModal = true">
          <q-item-section>Welcome</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
  <welcome-modal
    :showWelcomeModal="showWelcomeModal"
    @update="showWelcomeModal = $event"
  />
  <confirm-reset-modal
    :confirmResetModal="confirmResetModal"
    @update="confirmResetModal = $event"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import WelcomeModal from '../modals/WelcomeModal.vue';
import ConfirmResetModal from '../modals/ConfirmResetModal.vue';

export default defineComponent({
  name: 'MainMenu',
  components: {
    WelcomeModal,
    ConfirmResetModal,
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
      showWelcomeModal: ref<boolean>(false),
      confirmResetModal: ref<boolean>(false),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
  },
  methods: {
    autoRepairItemsUpdated: function (newVal: boolean) {
      this.simulationStore.autoRepairItems = newVal;
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
