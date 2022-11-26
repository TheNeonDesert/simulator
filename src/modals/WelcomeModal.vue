<template>
  <q-dialog
    :model-value="showWelcomeModal"
    :update:model-value="update"
    @hide="update(false)"
  >
    <q-card class="bg-black text-white position-relative">
      <span class="close-icon" v-close-popup>
        <q-img src="icons/close-icon.png" />
      </span>
      <q-card-section class="q-pt-none">
        <h6>Welcome to The Neon Desert</h6>
        <div class="q-pa-xs bg-white">
          <q-img src="images/mother/mother.jpg" />
        </div>
        <p class="text-center text-italic q-mx-lg q-mt-md">
          The Simulacrum. Built to discover and explore. A glimpse of the
          desert...
        </p>
        <q-img class="q-mb-md" src="images/glowing-divider.png" />
        <p>
          Welcome to The Neon Desert Simulator, we're excited to have you! Enjoy
          and explore this preview to TND. A few key differences from the real
          game...
        </p>
        <ul>
          <li>
            No Crypto: No crypto wallets or anything needed. Just explore and
            enjoy.
          </li>
          <li>
            No Waiting: Normal activities in TND have varying wait times,
            sometimes many days.
          </li>
          <li>
            No Persistence: Reload or close the game and everything resets.
          </li>
          <li>
            Single Avatar: The simulation only represents one Avatar's journey,
            your full expression in the desert will span a great many avatars.
          </li>
        </ul>
        <p
          class="cursor-pointer text-italic"
          style="text-decoration: underline"
          @click="restartTutorial"
        >
          Restart Tutorial
        </p>
        <p
          class="cursor-pointer text-italic"
          style="text-decoration: underline"
          @click="showVersionHistory = true"
        >
          What's new in Version 0.0.3
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          class="q-mr-md q-mb-md"
          outline
          label="OK"
          color="white"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <version-history-modal
    :showVersionHistory="showVersionHistory"
    @update="showVersionHistory = $event"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VersionHistoryModal from '../modals/VersionHistoryModal.vue';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

export default defineComponent({
  name: 'WelcomeModal',
  components: { VersionHistoryModal },
  props: {
    showWelcomeModal: {
      required: true,
      type: Boolean,
    },
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
  },
  setup() {
    return {
      showVersionHistory: ref<boolean>(false),
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
    };
  },
  emits: ['update'],
  methods: {
    update: function (show: boolean) {
      this.$emit('update', show);
    },
    restartTutorial: function () {
      this.simulationStore.showTutorial = 1;
      this.$emit('update', false);
    },
  },
});
</script>

<style scoped lang="scss"></style>
