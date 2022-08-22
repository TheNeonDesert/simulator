<template>
  <div>
    <h6>Gather Resources</h6>

    <q-card
      v-for="resource in gatherableResources"
      v-bind:key="resource.model"
      class="row q-my-md"
    >
      <div class="q-ma-md">
        <div class="row">
          <p v-html="resource.description" />
        </div>
        <div class="row">
          <q-input
            v-model.number="durationModels[resource.model]"
            label="Duration"
            type="number"
            outlined
            dense
            class="col-3"
          />
          <div class="col-1"></div>
          <q-btn
            :label="resource.label"
            @click="resource.onclick"
            color="primary"
            class="col-8"
          ></q-btn>
        </div>
      </div>
    </q-card>
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
        forageAtWildernessDuration: 20,
        chopAtCedarForestDuration: 60,
        digAtCopperMineDuration: 60,
      }),
      gatherableResources: ref<
        {
          model: string;
          label: string;
          description: string;
          onclick: () => void;
        }[]
      >(),
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
    };
  },
  // TODO instead of hover tooltip for locations, add like a little icon and what you can gather there...
  created: async function () {
    this.simulationStore = useSimulationStore();
    this.gatherableResources = [
      {
        model: 'forageAtWildernessDuration',
        label: 'forage at wilderness',
        description:
          'Forage for <u>sticks</u>, <u>stones</u>, <u>plant fibers</u>, and <u>apples</u>. Watch out for <b>wolves</b> though! You might want to bring a <i>dagger</i>...',
        onclick: this.forageAtWilderness,
      },
      {
        model: 'chopAtCedarForestDuration',
        label: 'chop at cedar forest',
        description:
          'Chop wood to collect <u>cedar logs</u> and pick up the occasional <u>pine tar</u>. Don\t forget to bring a ranged weapon like a <i>sling</i> to fend off the <b>eagles</b>',
        onclick: this.chopAtCedarForest,
      },
      {
        model: 'digAtCopperMineDuration',
        label: 'dig at copper mine',
        description:
          'Dig for <u>copper ore</u> but keep an eye out for anything that sparkles.. and any creatures that may want to steal them!',
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
