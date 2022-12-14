<template>
  <div>
    <h6>Gather Resources</h6>

    <q-card
      v-for="resource in gatherableResources"
      v-bind:key="resource.model"
      class="row q-my-md gatherable-resource cursor-pointer"
      @click="resource.onclick(resource.location)"
    >
      <div class="q-pa-md full-width">
        <div class="q-pa-xs q-mb-md bg-white">
          <q-img :src="resource.bannerImage" />
        </div>
        <div class="row">
          <q-btn
            :label="resource.label"
            color="primary"
            class="col-12"
            :loading="actionLoading[resource.location]"
            :class="{
              'highlight-animation':
                showTutorial && resource.location === 'wilderness',
            }"
          ></q-btn>
        </div>
      </div>
    </q-card>
  </div>

  <loadout-screen
    :showLoadoutScreen="showLoadoutScreen"
    @update="showLoadoutScreen = $event"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import _ from 'underscore';
import Utils from 'src/services/utils';
// import resourceGatheringService from 'src/services/resource-gathering.service';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import { ActionLogCategory } from 'src/models/ActionLog';
// import simulatorService from '../../services/simulator.service';
import LoadoutScreen from '../Loadout/LoadoutScreen.vue';

export default defineComponent({
  name: 'GatherResources',
  components: { LoadoutScreen },
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
          onclick: (location: string) => void;
          location: string;
          bannerImage: string;
        }[]
      >(),
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
      actionLoading: ref<{ [location: string]: boolean }>({}),
      showLoadoutScreen: ref<boolean>(false),
      showTutorial: ref<boolean>(false),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
    this.gatherableResources = [
      {
        model: 'forageAtWildernessDuration',
        label: 'forage at wilderness',
        bannerImage: 'images/locations/wilderness-wide.jpg',
        description:
          'Forage for <u>sticks</u>, <u>stones</u>, <u>plant fibers</u>, and <u>apples</u>. Watch out for <b>wolves</b> though! You might want to bring a <i>dagger</i>...',
        onclick: this.gatherResources,
        location: 'wilderness',
      },
      {
        model: 'chopAtCedarForestDuration',
        label: 'chop at cedar forest',
        bannerImage: 'images/locations/cedar-forest-wide.jpg',
        description:
          "Chop wood to collect <u>cedar logs</u> and pick up the occasional <u>pine tar</u>. Don't forget to bring a ranged weapon like a <i>sling</i> to fend off the <b>eagles</b>",
        onclick: this.gatherResources,
        location: 'cedarForest',
      },
      {
        model: 'digAtCopperMineDuration',
        label: 'dig at copper mine',
        bannerImage: 'images/locations/copper-mine-wide.jpg',
        description:
          'Dig for <u>copper ore</u> but keep an eye out for anything that sparkles.. and any creatures that may want to steal them!',
        onclick: this.gatherResources,
        location: 'copperMine',
      },
    ];
    if (this.simulationStore.showTutorial === 2) {
      this.showTutorial = true;
    }
  },
  methods: {
    displayResults: function (results: string[]) {
      _.each(results, (notification) => {
        if (notification.startsWith('ALERT::')) {
          Utils.error(notification.substring(7), ActionLogCategory.actions);
        } else {
          Utils.info(notification, ActionLogCategory.actions);
        }
      });
    },
    async gatherResources(location: string) {
      if (
        location === 'wilderness' &&
        this.simulationStore.showTutorial === 2
      ) {
        this.showTutorial = false;
        this.simulationStore.showTutorial = 3;
      }

      this.showLoadoutScreen = true;
      return;

      // try {
      //   let results;
      //   switch (location) {
      //     case 'wilderness':
      //       results = resourceGatheringService.forageAtWilderness(
      //         this.durationModels.forageAtWildernessDuration
      //       );
      //       break;
      //     case 'cedarForest':
      //       results = resourceGatheringService.chopAtCedarForest(
      //         this.durationModels.chopAtCedarForestDuration
      //       );
      //       break;
      //     case 'copperMine':
      //       results = resourceGatheringService.digAtCopperMine(
      //         this.durationModels.digAtCopperMineDuration
      //       );
      //       break;
      //   }
      //   this.actionLoading[location] = true;
      //   await Utils.wait(1000);
      //   if (results) this.displayResults(results);
      //   if (this.simulationStore.autoRepairItems) {
      //     simulatorService.repairAllItems();
      //   }
      //   this.actionLoading[location] = false;
      // } catch (err) {
      //   Utils.error(err as string, ActionLogCategory.actions);
      //   this.actionLoading[location] = false;
      // }
    },
  },
});
</script>

<style scoped lang="scss">
.gatherable-resource {
  background-color: $page-backround;
  box-shadow: 0 1px 5px rgb(255 255 255 / 20%), 0 2px 2px rgb(255 255 255 / 14%),
    0 3px 1px -2px rgb(255 255 255 / 12%);
}
</style>
