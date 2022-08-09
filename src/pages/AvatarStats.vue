<template>
  <div>
    <h6>Avatar Stats</h6>
    <ul>
      <li>total actions this game: {{ simulationStore.totalActions }}</li>
      <li>total neon spent this game: -</li>
    </ul>
    <ul>
      <li>health: !!</li>
      <li>initiative: !!</li>
      <li>carrying capacity: {{ getCarryingCapacity() }}</li>
    </ul>
    <ul>
      <li>strength: -</li>
      <li>dexterity: -</li>
      <li>intelligence: -</li>
    </ul>
    <ul>
      <li>exploration: - / 100</li>
      <li>woodcutting: - / 100</li>
      <li>mining: - / 100</li>
      <li>swordsmanship: - / 100</li>
      <li>archery: - / 100</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import avatarService from '../services/avatar.service';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

export default defineComponent({
  name: 'AvatarStats',
  setup() {
    return {
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
  },
  methods: {
    getCarryingCapacity: function () {
      return avatarService.calculateCarryingCapacity();
    },
  },
});
</script>

<style scoped lang="scss"></style>
