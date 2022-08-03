<template>
  <q-page class="q-pa-lg" style="min-height: 0" v-if="settingsStore">
    <!-- <div class="row">
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
    </div> -->

    <div class="row q-mt-md">
      <div class="col-3">
        <q-btn
          label="start simulation"
          @click="start"
          color="primary"
          :disable="started"
        />
      </div>
      <div class="col-3">
        <q-btn label="reset simulation" @click="reset" color="primary" />
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <h6>Wilderness</h6>
        <div class="row q-mt-md">
          <q-btn
            class="q-mr-md"
            label="forage at wilderness"
            @click="forageAtWilderness"
            color="primary"
            :disable="!started"
          />
          <q-input
            v-model.number="forageAtWildernessDuration"
            label="Duration"
            type="number"
            outlined
            dense
          />
        </div>

        <div class="row q-mt-md">
          <q-btn
            label="craft stone dagger"
            @click="craft('stoneDagger')"
            color="primary"
            :disable="!started"
          />
        </div>
        <div class="row q-mt-md">
          <q-btn
            label="craft leather sack"
            @click="craft('leatherSack')"
            color="primary"
            :disable="!started"
          />
        </div>
        <div class="row q-mt-md">
          <q-btn
            label="craft stone axe"
            @click="craft('stoneAxe')"
            color="primary"
            :disable="!started"
          />
        </div>
        <div class="row q-mt-md">
          <q-btn
            label="craft stone pickaxe"
            @click="craft('stonePickaxe')"
            color="primary"
            :disable="!started"
          />
        </div>
      </div>
      <div class="col-3">
        <h6>Cedar Forest</h6>
        <div class="row q-mt-md">
          <q-btn
            class="q-mr-md"
            label="chop wood"
            @click="chopAtCedarForest"
            color="primary"
            :disable="!started"
          />
          <q-input
            v-model.number="chopAtCedarForestDuration"
            label="Duration"
            type="number"
            outlined
            dense
          />
        </div>
      </div>
    </div>

    <h6>Inventory</h6>
    <div class="row">
      <div class="col-2">
        <ul>
          <li>total actions: {{ simulationStore.totalActions }}</li>
          <li>carrying capacity: {{ getCarryingCapacity() }}</li>
        </ul>
      </div>
      <div class="col-2">
        <ul>
          <li>stone: {{ Math.trunc(inventoryStore.stone * 100) / 100 }}</li>
          <li>stick: {{ Math.trunc(inventoryStore.stick * 100) / 100 }}</li>
          <li>
            plant fiber: {{ Math.trunc(inventoryStore.plantFiber * 100) / 100 }}
          </li>
          <li>apple: {{ Math.trunc(inventoryStore.apple * 100) / 100 }}</li>
          <li>wolf pelt: {{ inventoryStore.wolfPelt }}</li>
        </ul>
        <ul>
          <li>stone dagger: {{ inventoryStore.stoneDagger }}</li>
          <li>leather sack: {{ inventoryStore.leatherSack }}</li>
          <li>stone axe: {{ inventoryStore.stoneAxe }}</li>
          <li>stone pickaxe: {{ inventoryStore.stonePickaxe }}</li>
        </ul>
      </div>
      <div class="col-2">
        <ul>
          <li>x: 0</li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import simulator from '../services/simulator.service';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
// import SNumberInput from '../components/s-number-input.vue';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  // components: { SNumberInput },
  setup() {
    return {
      settingsStore: ref<SettingsStore>(null as unknown as SettingsStore),
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
      inventoryStore: ref<InventoryStore>(null as unknown as InventoryStore),
      // showMore: ref<boolean>(false),
      // showSettings: ref<boolean>(false),
      // showResults: ref<boolean>(true),
      started: ref<boolean>(false),
      forageAtWildernessDuration: ref<number>(10),
      chopAtCedarForestDuration: ref<number>(10),
    };
  },
  created: async function () {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.inventoryStore = useInventoryStore();
  },
  methods: {
    // TODO convert all the returns to try/catch and Notify on err with the message
    start: function () {
      simulator.prerun();
      this.started = true;
    },
    reset: function () {
      simulator.prerun();
      this.started = false;
    },
    getCarryingCapacity: function () {
      return simulator.calculateCarryingCapacity();
    },
    forageAtWilderness: function () {
      const resp = simulator.forageAtWilderness(
        this.forageAtWildernessDuration
      );
      console.log('forageAtWilderness:', resp);
    },
    craft: function (itemKey: string) {
      try {
        simulator.craft(itemKey);
        Notify.create(`${itemKey} crafted`);
      } catch (err) {
        Notify.create(err as string);
      }
    },
    chopAtCedarForest: function () {
      // this.inventoryStore.copperCedarAxes;
      // const resp = simulator.chopAtCedarForest(this.chopAtCedarForestDuration);
      // console.log('chopAtCedarForest:', resp);
      // TODO give back axe in the resp, and push back to front of array
      // TODO handle durability/repair, auto-repair? list out for user? (li for each below full dur, then just x37 for rest)
      // TODO, or just do a repair all?
    },
  },
});
</script>

<style scoped lang="scss">
h6 {
  margin: 20px auto;
}
</style>
