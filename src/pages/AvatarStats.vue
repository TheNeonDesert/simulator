<template>
  <div>
    <h6>Avatar Stats</h6>
    <q-btn label="heal avatar" @click="healAvatar" color="primary" />
    <ul>
      <li>total actions this game: {{ simulationStore.totalActions }}</li>
      <!-- <li>total neon spent this game: -</li> -->
    </ul>
    <ul>
      <li>health: {{ avatarStore.health }}</li>
      <!-- <li>initiative: !!</li> -->
      <li>carrying capacity: {{ getCarryingCapacity() }}</li>
    </ul>
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
      <li>archery: - / 100</li>
    </ul> -->
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

<style scoped lang="scss"></style>
