<template>
  <div>
    <h6>Avatar Stats</h6>
    <div class="q-pa-xs bg-white">
      <q-img src="images/neon-light-bulbs.jpg" />
    </div>
    <q-list class="q-mt-md bordered">
      <q-item
        ><q-item-section>
          <q-item-label class="text-capitalize"
            >total actions this game</q-item-label
          >
          <div>{{ simulationStore.totalActions }}</div>
        </q-item-section></q-item
      >

      <q-item
        ><q-item-section>
          <q-item-label class="text-capitalize">max health</q-item-label>
          <div>{{ avatarStore.health }}</div></q-item-section
        ></q-item
      >
      <q-item
        ><q-item-section>
          <q-item-label class="text-capitalize"
            >max carrying capacity</q-item-label
          >
          <div>{{ getCarryingCapacity() }}</div></q-item-section
        ></q-item
      >
    </q-list>

    <!-- TODO total NEON spent this game -->
    <!-- TODO initiative -->
    <!-- TODO add total time per skill (mining/foraging/etc) as an expandable breakdown -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import avatarService from 'src/services/avatar.service';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import { AvatarStore, useAvatarStore } from 'src/stores/avatar.store';

export default defineComponent({
  name: 'AvatarStats',
  setup() {
    return {
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
      avatarStore: ref<AvatarStore>(null as unknown as AvatarStore),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
    this.avatarStore = useAvatarStore();
  },
  methods: {
    getCarryingCapacity: function () {
      return avatarService.calculateCarryingCapacity();
    },
  },
});
</script>

<style scoped lang="scss"></style>
