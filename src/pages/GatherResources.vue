<template>
  <div>
    <h6>Gather Resources</h6>

    <div
      v-for="resource in gatherableResources"
      v-bind:key="resource.model"
      class="row q-mt-md"
    >
      <q-input
        v-model.number="durationModels[resource.model]"
        label="Duration"
        type="number"
        outlined
        dense
        class="q-mr-md"
        style="width: 100px"
      />
      <q-btn :label="resource.label" @click="resource.onclick" color="primary"
        ><q-tooltip v-if="resource.tooltip && simulationStore.showTooltips">
          {{ resource.tooltip }}
        </q-tooltip></q-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import _ from 'underscore';
import Utils from 'src/services/utils';
import resourceGatheringService from 'src/services/resource-gathering.service';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

export default defineComponent({
  name: 'GatherResources',
  setup() {
    return {
      durationModels: ref<{ [key: string]: number }>({
        forageAtWildernessDuration: 10,
        chopAtCedarForestDuration: 10,
        digAtCopperMineDuration: 10,
      }),
      gatherableResources: ref<
        {
          model: string;
          label: string;
          tooltip?: string;
          onclick: () => void;
        }[]
      >(),
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
    this.gatherableResources = [
      {
        model: 'forageAtWildernessDuration',
        label: 'forage at wilderness',
        tooltip:
          'Forage for sticks, stones, plant fibers, and apples. Watch out for wolves though! You might want to bring a dagger...',
        onclick: this.forageAtWilderness,
      },
      {
        model: 'chopAtCedarForestDuration',
        label: 'chop at cedar forest',
        tooltip:
          'Chop wood and collect cedar logs and pick up the occasional pine tar. Don\t forget to bring a ranged weapon to fend off the eagles',
        onclick: this.chopAtCedarForest,
      },
      {
        model: 'digAtCopperMineDuration',
        label: 'dig at copper mine',
        tooltip:
          'Dig for copper ore but keep an eye out for anything that sparkles, and any creates that may want to steal them!',
        onclick: this.digAtCopperMine,
      },
    ];
  },
  methods: {
    displayResults: function (results: string[]) {
      _.each(results, (notification) => {
        if (notification.startsWith('ALERT::')) {
          Utils.error(notification.substring(7));
        } else {
          Utils.notify(notification);
        }
      });
    },
    // TODO maybe abstract this all out into a generic runAction() method
    // TODO add a 1000ms wait to encounters, with a loading spinner, to make it feel weighty
    forageAtWilderness: function () {
      try {
        const results = resourceGatheringService.forageAtWilderness(
          this.durationModels.forageAtWildernessDuration
        );
        this.displayResults(results);
      } catch (err) {
        Utils.error(err as string);
      }
    },
    chopAtCedarForest: function () {
      try {
        const results = resourceGatheringService.chopAtCedarForest(
          this.durationModels.chopAtCedarForestDuration
        );
        this.displayResults(results);
      } catch (err) {
        Utils.error(err as string);
      }
    },
    digAtCopperMine: function () {
      try {
        const results = resourceGatheringService.digAtCopperMine(
          this.durationModels.digAtCopperMineDuration
        );
        this.displayResults(results);
      } catch (err) {
        Utils.error(err as string);
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
