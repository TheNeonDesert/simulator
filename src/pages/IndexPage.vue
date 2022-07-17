<template>
  <q-page class="row q-pa-lg" style="min-height: 0">
    <div v-for="input of inputs" v-bind:key="input.key" class="col-4">
      <q-input v-model="settingsStore[input.key]" :label="input.label">
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            {{ input.label }}
            <q-icon class="q-mr-xs" color="primary" name="info" />
            <q-tooltip>{{ input.description }}</q-tooltip>
          </div>
        </template>
      </q-input>
    </div>
    <q-btn
      label="run simulation"
      @click="run"
      color="primary"
      class="q-mt-md"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import _ from 'underscore';
import simulator from '../services/simulator.service';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    let inputs = {
      actionsPerMinute: {
        key: 'actionsPerMinute',
        label: 'Actions Per Minute',
        description: 'Game actions per minute',
        sortOrder: 1,
      },
      woodProducedPerAction: {
        key: 'woodProducedPerAction',
        label: 'Wood Produced Per Action',
        description: 'Average cedar wood produced per action',
        sortOrder: 2,
      },
      durabilityUsedPerAction: {
        key: 'durabilityUsedPerAction',
        label: 'Durability Used Per Action',
        description: 'Average axe durability used per action',
        sortOrder: 3,
      },
      minutesPerEnounter: {
        key: 'minutesPerEnounter',
        label: 'Minutes Per Enounter',
        description: 'How many minutes per encounter',
        sortOrder: 4,
      },
      numberEncounters: {
        key: 'numberEncounters',
        label: 'Number of Encounters',
        description: 'Total encounters to run in simulator',
        sortOrder: 5,
      },

      costOfWoodToCraftAxe: {
        key: 'costOfWoodToCraftAxe',
        label: 'Cost of Wood to Craft Axe',
        description: 'Cost of wood (ignoring metal) to craft axe',
        sortOrder: 6,
      },
      durabilityPtsPerAxe: {
        key: 'durabilityPtsPerAxe',
        label: 'Durability Points Per Axe',
        description: 'How many points of durability each axe starts with',
        sortOrder: 7,
      },

      woodInBackpack: {
        key: 'woodInBackpack',
        label: 'Starting Wood',
        description: 'Starting amount of wood',
        sortOrder: 8,
      },
      axesInBackpack: {
        key: 'axesInBackpack',
        label: 'Starting Axes',
        description: 'Starting amount of axes',
        sortOrder: 9,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inputs = _.sortBy(inputs, 'sortOrder') as any;

    return {
      inputs: ref<{ [key: string]: SimulatorInput }>(inputs),
      settingsStore: ref<SettingsStore>(),
    };
  },
  created: async function () {
    this.settingsStore = useSettingsStore();
    simulator;
  },
  methods: {
    run: function () {
      simulator.run();
    },
  },
});

interface SimulatorInput {
  key: string;
  label: string;
  description: string;
  sortOrder: number;
}
</script>
