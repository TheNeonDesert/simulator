<template>
  <div>
    <h6>Avatar Stats</h6>
    <ul>
      <li>total actions this game: {{ simulationStore.totalActions }}</li>
      <li>total neon spent this game: 1</li>
    </ul>
    <ul>
      <li>strength: 1</li>
      <li>dexterity: 1</li>
      <li>intelligence: 1</li>
      <li>carrying capacity: {{ getCarryingCapacity() }}</li>
    </ul>
    <ul>
      <li>exploration: 1 / 100</li>
      <li>woodcutting: 1 / 100</li>
      <li>mining: 1 / 100</li>
      <li>swordsmanship: 1 / 100</li>
      <li>archery: 1 / 100</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import simulator from '../services/simulator.service';
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
      return simulator.calculateCarryingCapacity();
    },
  },
});
</script>

<style scoped lang="scss"></style>
