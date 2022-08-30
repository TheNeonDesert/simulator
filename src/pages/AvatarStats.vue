<template>
  <div>
    <h6>Avatar Stats</h6>

    <q-btn label="heal avatar" @click="healAvatar" color="primary" />

    <q-list bordered separator class="q-mt-md">
      <q-item
        ><q-item-section>
          <q-item-label class="text-capitalize"
            >total actions this game</q-item-label
          >
          <div>{{ simulationStore.totalActions }}</div>
          <!-- TODO add total time per mining/foraging/etc as an expandable breakdown -->
        </q-item-section></q-item
      >
      <!-- <li>total neon spent this game: -</li> -->

      <q-item
        ><q-item-section>
          <q-item-label class="text-capitalize">health</q-item-label>
          <div>{{ avatarStore.health }}</div></q-item-section
        ></q-item
      >
      <!-- <li>initiative: !!</li> -->
      <q-item
        ><q-item-section>
          <q-item-label class="text-capitalize">carrying capacity</q-item-label>
          <div>{{ getCarryingCapacity() }}</div></q-item-section
        ></q-item
      >

      <!-- <ul>
      <li>strength: -</li>
      <li>dexterity: -</li>
      <li>intelligence: -</li>
    </ul> -->
      <!-- <ul>
      <li>exploration: - / 100</li>
      <li>woodcutting: - / 100</li>
      <li>mining: - / 100</li>
      <li>swordsmanship: - / 100</li>
      <li>archery: - / 100</li> -->
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import avatarService from '../services/avatar.service';
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
    healAvatar: function () {
      this.avatarStore.health = 100;
    },
  },
});
</script>

<style scoped lang="scss">
.q-item__label {
  color: gray;
}
</style>
