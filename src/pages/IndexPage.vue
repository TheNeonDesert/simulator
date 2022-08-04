<template>
  <q-page class="q-pa-lg">
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

    <edit-settings v-if="!started" />

    <div v-if="started">
      <div class="row">
        <div class="col-3">
          <h6>Avatar Stats</h6>
          <ul>
            <li>total actions this game: {{ simulationStore.totalActions }}</li>
            <li>carrying capacity: {{ getCarryingCapacity() }}</li>
          </ul>
          <ul>
            <li>strength: 1</li>
            <li>dexterity: 1</li>
            <li>intelligence: 1</li>
          </ul>
          <ul>
            <li>exploration: 1 / 100</li>
            <li>woodcutting: 1 / 100</li>
            <li>mining: 1 / 100</li>
            <li>swordsmanship: 1 / 100</li>
            <li>archery: 1 / 100</li>
          </ul>
        </div>
        <div class="col-3">
          <h6>Resources</h6>
          <ul>
            <li>stone: {{ Math.trunc(inventoryStore.stone * 100) / 100 }}</li>
            <li>stick: {{ Math.trunc(inventoryStore.stick * 100) / 100 }}</li>
            <li>
              plant fiber:
              {{ Math.trunc(inventoryStore.plantFiber * 100) / 100 }}
            </li>
            <li>apple: {{ Math.trunc(inventoryStore.apple * 100) / 100 }}</li>
            <li>wolf pelt: {{ inventoryStore.wolfPelt }}</li>
          </ul>
          <ul>
            <li>cedar: 0</li>
            <li>copper: 0</li>
            <li>pine tar: 0</li>
            <li>gems: 0</li>
          </ul>
        </div>
        <div class="col-3">
          <h6>Items</h6>
          <ul>
            <li>leather sack: {{ inventoryStore.leatherSack }}</li>
            <li>stone dagger: {{ inventoryStore.stoneDagger }}</li>
            <li>stone axe: {{ inventoryStore.stoneAxe }}</li>
            <li>stone pickaxe: {{ inventoryStore.stonePickaxe }}</li>
          </ul>
          <ul>
            <li>cedar copper axe: 0</li>
            <li>cedar copper pickaxe: 0</li>
            <li>cedar copper sword: 0</li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-3">
          <h6>Crafting Station</h6>
          <div class="row q-mt-md">
            <q-btn
              label="repair all items"
              @click="repairAllItems()"
              color="primary"
            />
          </div>
          <div
            v-for="item in craftableItems"
            v-bind:key="item.itemKey"
            class="row q-mt-md"
          >
            <q-btn
              :label="item.label"
              @click="item.onclick(item.itemKey)"
              color="primary"
            />
          </div>
        </div>

        <div class="col-3">
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
            <q-btn
              :label="resource.label"
              @click="resource.onclick"
              color="primary"
            />
          </div>
        </div>

        <div class="col-3">
          <h6>Combat Encounters</h6>
          <div
            v-for="encounter in combatEncounters"
            v-bind:key="encounter.label"
            class="row q-mt-md"
          >
            <q-btn
              :label="encounter.label"
              @click="encounter.onclick()"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import simulator from '../services/simulator.service';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import EditSettings from './EditSettings.vue';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import { InventoryStore, useInventoryStore } from 'src/stores/inventory.store';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  components: { EditSettings },
  setup() {
    return {
      settingsStore: ref<SettingsStore>(null as unknown as SettingsStore),
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
      inventoryStore: ref<InventoryStore>(null as unknown as InventoryStore),
      started: ref<boolean>(true),
      durationModels: ref<{ [key: string]: number }>({
        forageAtWildernessDuration: 10,
        chopAtCedarForestDuration: 10,
        digAtCopperMineDuration: 10,
      }),
      craftableItems: ref<
        {
          label: string;
          itemKey: string;
          onclick: (itemKey: string) => void;
        }[]
      >(),
      gatherableResources: ref<
        {
          model: string;
          label: string;
          onclick: () => void;
        }[]
      >(),
      combatEncounters: ref<
        {
          label: string;
          onclick: () => void;
        }[]
      >(),
    };
  },
  created: async function () {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.inventoryStore = useInventoryStore();

    this.craftableItems = [
      {
        label: 'leather sack',
        itemKey: 'leatherSack',
        onclick: this.craft,
      },
      {
        label: 'stone dagger',
        itemKey: 'stoneDagger',
        onclick: this.craft,
      },
      {
        label: 'stone axe',
        itemKey: 'stoneAxe',
        onclick: this.craft,
      },
      {
        label: 'stone pickaxe',
        itemKey: 'stonePickaxe',
        onclick: this.craft,
      },
      {
        label: 'cedar copper axe',
        itemKey: 'cedarCopperAxe',
        onclick: this.craft,
      },
      {
        label: 'cedar copper pickaxe',
        itemKey: 'cedarCopperPickaxe',
        onclick: this.craft,
      },
      {
        label: 'cedar copper sword',
        itemKey: 'cedarCopperSword',
        onclick: this.craft,
      },
    ];

    this.gatherableResources = [
      {
        model: 'forageAtWildernessDuration',
        label: 'forage at wilderness',
        onclick: this.forageAtWilderness,
      },
      {
        model: 'chopAtCedarForestDuration',
        label: 'chop at cedar forest',
        onclick: this.chopAtCedarForest,
      },
      {
        model: 'digAtCopperMineDuration',
        label: 'dig at copper mine',
        onclick: this.digAtCopperMine,
      },
    ];

    this.combatEncounters = [
      { label: 'goblin encampment', onclick: this.raidGoblinEncampment },
    ];
  },
  methods: {
    // TODO convert all the returns to try/catch and Notify on err with the message
    start: function () {
      simulator.prerun();
      this.started = true;
    },
    reset: function () {
      simulator.prerun(); // show summary maybe instead of this?, rename to end and show summary
      this.started = false;
    },
    getCarryingCapacity: function () {
      return simulator.calculateCarryingCapacity();
    },
    forageAtWilderness: function () {
      const resp = simulator.forageAtWilderness(
        this.durationModels.forageAtWildernessDuration
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
    digAtCopperMine: function () {
      null;
    },
    raidGoblinEncampment: function () {
      null;
    },
    repairAllItems: function () {
      null;
    },
  },
});
</script>

<style scoped lang="scss">
h6 {
  margin: 20px auto;
}
</style>
