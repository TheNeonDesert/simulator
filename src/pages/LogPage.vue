<template>
  <div class="text-white">
    <q-list dark bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="(log, idx) in simulationStore.getLogs"
        v-bind:key="idx"
        :class="{
          'text-yellow': log.level === 'warning',
          'text-red': log.level === 'error',
        }"
      >
        <q-item-section>
          <q-item-label overline>{{ formatDate(log.timestamp) }}</q-item-label>
          <q-item-label>{{ log.message }}</q-item-label>
          <q-item-label caption>{{ log.category }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import { date } from 'quasar';

export default defineComponent({
  name: 'LogPage',
  setup() {
    return {
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
  },
  methods: {
    formatDate: function (val: Date) {
      return date.formatDate(val, 'MMM D, YYYY : h:mma');
    },
  },
});
</script>

<style scoped lang="scss"></style>
