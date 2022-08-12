<template>
  <div>
    <h6>Crafting Station</h6>
    <div class="row q-mt-md">
      <!-- TODO move this over towards inventory -->
      <q-btn
        label="repair all items"
        @click="repairAllItems()"
        color="primary"
      />
    </div>

    <q-card
      class="q-my-md q-mr-md"
      v-for="(itemGroup, key) in craftableItems"
      v-bind:key="key"
    >
      <q-card-section style="padding-bottom: 0">
        <div class="text-subtitle1 text-capitalize">
          {{ key }}
        </div>
      </q-card-section>
      <q-card-section style="padding-top: 0">
        <q-btn
          v-for="item in itemGroup"
          v-bind:key="item.itemKey"
          @click="item.onclick(item.itemKey)"
          class="row q-my-sm"
          color="secondary"
          :loading="loading[item.itemKey]"
          :label="item.label"
          ><q-tooltip v-if="item.tooltip && simulationStore.showTooltips">
            {{ item.tooltip }}
          </q-tooltip></q-btn
        >
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import simulatorService from '../services/simulator.service';
import craftingService from '../services/crafting.service';
import Utils from 'src/services/utils';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

export default defineComponent({
  name: 'CraftingStation',
  setup() {
    return {
      craftableItems: ref<{
        [key: string]: {
          label: string;
          itemKey: string;
          tooltip?: string;
          onclick: (itemKey: string) => void;
        }[];
      }>(),
      loading: ref<{ [itemKey: string]: boolean }>({}),
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
    this.craftableItems = {
      utilities: [
        {
          label: 'leather sack',
          itemKey: 'leatherSack',
          tooltip: 'Increase carrying capacity',
          onclick: this.craft,
        },
      ],
      axes: [
        {
          label: 'stone axe',
          itemKey: 'stoneAxe',
          onclick: this.craft,
        },
        {
          label: 'cedar copper axe',
          itemKey: 'cedarCopperAxe',
          onclick: this.craft,
        },
      ],
      pickaxes: [
        {
          label: 'stone pickaxe',
          itemKey: 'stonePickaxe',
          onclick: this.craft,
        },
        {
          label: 'cedar copper pickaxe',
          itemKey: 'cedarCopperPickaxe',
          onclick: this.craft,
        },
      ],
      'melee weapons': [
        {
          label: 'stone dagger',
          itemKey: 'stoneDagger',
          onclick: this.craft,
        },
        {
          label: 'copper sword',
          itemKey: 'copperSword',
          onclick: this.craft,
        },
      ],
      'ranged weapons': [
        {
          label: 'sling',
          itemKey: 'sling',
          onclick: this.craft,
        },
      ],
    };
  },
  methods: {
    wait: async function (itemKey: string) {
      this.loading[itemKey] = true;
      await Utils.wait(1000);
      this.loading[itemKey] = false;
    },
    craft: function (itemKey: string) {
      try {
        craftingService.craft(itemKey);
        this.wait(itemKey);
        Utils.notify(`${itemKey} crafted`);
      } catch (err) {
        Utils.error(err as string);
      }
    },
    repairAllItems: function () {
      simulatorService.repairAllItems();
    },
  },
});
</script>

<style scoped lang="scss"></style>
