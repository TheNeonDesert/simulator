<template>
  <q-page class="q-pa-lg" style="min-height: 0" v-if="settingsStore">
    <div class="row">
      <div class="col-12" v-if="!showMore">
        <p>
          The goal of this simulator is to be able to plan and layout cost and
          production of goods and resources in The Neon Desert game
          <a @click="showMore = true" href="javascript:void(0)">more...</a>
        </p>
      </div>
      <div class="col-12" v-if="showMore">
        <p>
          The goal of this simulator is to be able to plan and layout cost and
          production of goods and resources in The Neon Desert game
        </p>
        <p>
          The game is being engineered to persist a resetting growth curve that
          starts in the negative at each new milestone reached, and grows as you
          play the game
        </p>
        <p>
          In the below default configuration, at the beginning of each new
          milestone, factoring in all standard bonuses acquired to reach that
          milestone, the resources produced over a given amount of time will be
          entirely consumed by the items needed to create in order to produce
          the resources in the first place
          <a @click="showMore = false" href="javascript:void(0)">...less</a>
        </p>
      </div>
    </div>
    <div class="row" v-if="!showSettings">
      <a @click="showSettings = true" href="javascript:void(0)"
        >show settings >></a
      >
    </div>
    <div class="row" v-if="showSettings">
      <a class="col-12" @click="showSettings = false" href="javascript:void(0)"
        >&lt;&lt; hide settings</a
      >
      <div class="col-3">
        <h6>Game Settings</h6>
        <s-number-input
          v-model:model="settingsStore.actionsPerMinute"
          label="Actions Per Minute"
          description="Game actions per minute"
          @updated="settingsStore.actionsPerMinute = $event"
        ></s-number-input>
        <s-number-input
          v-model:model="settingsStore.durabilityUsedPerAction"
          label="Durability Used Per Action"
          description="Average axe durability used per action"
          @updated="settingsStore.durabilityUsedPerAction = $event"
        ></s-number-input>
        <s-number-input
          v-model:model="settingsStore.minutesPerEnounter"
          label="Minutes Per Enounter"
          description="How many minutes per encounter"
          @updated="settingsStore.minutesPerEnounter = $event"
        ></s-number-input>
        <s-number-input
          v-model:model="settingsStore.numberEncounters"
          label="Number of Encounters"
          description="Total encounters to run in simulator"
          @updated="settingsStore.numberEncounters = $event"
        ></s-number-input>
      </div>
      <div class="col-1"></div>
      <div class="col-3">
        <h6>Production Details</h6>
        <s-number-input
          v-model:model="settingsStore.woodProducedPerAction"
          label="Wood Produced Per Action"
          description="Average cedar wood produced per action"
          @updated="settingsStore.woodProducedPerAction = $event"
        ></s-number-input>
        <s-number-input
          v-model:model="settingsStore.costOfWoodToCraftAxe"
          label="Cost of Wood to Craft Axe"
          description="Cost of wood (ignoring metal) to craft axe"
          @updated="settingsStore.costOfWoodToCraftAxe = $event"
        ></s-number-input>
        <s-number-input
          v-model:model="settingsStore.durabilityPtsPerAxe"
          label="Durability Points Per Axe"
          description="How many points of durability each axe starts with"
          @updated="settingsStore.durabilityPtsPerAxe = $event"
        ></s-number-input>
      </div>
      <div class="col-1"></div>
      <div class="col-3">
        <h6>Starting Resources</h6>
        <s-number-input
          v-model:model="settingsStore.startingCedar"
          label="Starting Cedar Wood"
          description="Starting amount of cedar wood"
          @updated="settingsStore.startingCedar = $event"
        ></s-number-input>
        <s-number-input
          v-model:model="settingsStore.startingCedarCopperAxes"
          label="Starting Axes"
          description="Starting amount of axes"
          @updated="settingsStore.startingCedarCopperAxes = $event"
        ></s-number-input>
      </div>
    </div>

    <div class="row q-py-md" v-if="!showResults">
      <a @click="showResults = true" href="javascript:void(0)"
        >show results >></a
      >
    </div>
    <div class="row q-py-md" v-if="showResults && simulationStore.results">
      <div class="col-12" v-html="simulationStore.results"></div>
      <a class="col-12" @click="showResults = false" href="javascript:void(0)"
        >&lt;&lt; hide results</a
      >
    </div>

    <div class="row">
      <q-btn
        label="run simulation"
        @click="run"
        color="primary"
        class="q-mt-md"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import simulator from '../services/simulator.service';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import SNumberInput from '../components/s-number-input.vue';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

export default defineComponent({
  name: 'IndexPage',
  components: { SNumberInput },
  setup() {
    return {
      settingsStore: ref<SettingsStore>(null as unknown as SettingsStore),
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
      showMore: ref<boolean>(false),
      showSettings: ref<boolean>(false),
      showResults: ref<boolean>(true),
    };
  },
  created: async function () {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    simulator;
  },
  methods: {
    run: function () {
      simulator.run();
    },
  },
});
</script>

<style scoped lang="scss">
h6 {
  margin: 20px auto;
}
</style>
