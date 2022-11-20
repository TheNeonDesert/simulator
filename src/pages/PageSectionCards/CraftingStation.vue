<template>
  <div>
    <h6>Crafting Station</h6>
    <div class="q-pa-xs bg-white">
      <q-img src="images/locations/crafting-table-wide.jpg" />
    </div>
    <q-card
      class="q-my-md crafting-section"
      v-for="(itemGroup, key) in craftableItems"
      v-bind:key="key"
    >
      <q-card-section style="padding-bottom: 0">
        <div class="text-subtitle1 text-capitalize">
          {{ key }}
        </div>
      </q-card-section>
      <q-card-section style="padding-top: 0">
        <div v-for="item in itemGroup" v-bind:key="item.itemKey">
          <q-separator class="q-mt-lg" />
          <p class="row">
            <i>{{ item.description }}</i>
          </p>
          <q-btn
            style="margin-top: -15px"
            class="row"
            @click="item.onclick(item.itemKey)"
            color="primary"
            :loading="loading[item.itemKey]"
            :label="item.label"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import craftingService from '../../services/crafting.service';
import Utils from 'src/services/utils';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';
import { ActionLogCategory } from 'src/models/ActionLog';

export default defineComponent({
  name: 'CraftingStation',
  setup() {
    return {
      craftableItems: ref<{
        [key: string]: {
          label: string;
          itemKey: string;
          description: string;
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
          description: 'Increase carrying capacity',
          onclick: this.craft,
        },
      ],
      axes: [
        {
          label: 'stone axe',
          itemKey: 'stoneAxe',
          description: 'Basic axe, needed for chopping wood',
          onclick: this.craft,
        },
        {
          label: 'cedar copper axe',
          itemKey: 'cedarCopperAxe',
          description: 'Improved axe',
          onclick: this.craft,
        },
      ],
      pickaxes: [
        {
          label: 'stone pickaxe',
          itemKey: 'stonePickaxe',
          description: 'Basic pickaxe, needed to mine for ore',
          onclick: this.craft,
        },
        {
          label: 'cedar copper pickaxe',
          itemKey: 'cedarCopperPickaxe',
          description: 'Improved pickaxe',
          onclick: this.craft,
        },
      ],
      'melee weapons': [
        {
          label: 'stone dagger',
          itemKey: 'stoneDagger',
          description: 'Basic melee weapon',
          onclick: this.craft,
        },
        {
          label: 'copper sword',
          itemKey: 'copperSword',
          description: 'Dispatch your enemies even more effectively',
          onclick: this.craft,
        },
      ],
      'ranged weapons': [
        {
          label: 'sling',
          itemKey: 'sling',
          description: 'Basic ranged weapon, uses stones for ammo',
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
        Utils.info(`${itemKey} crafted`, ActionLogCategory.actions);
      } catch (err) {
        Utils.error(err as string, ActionLogCategory.actions);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.crafting-section {
  background-color: $page-backround;
  box-shadow: 0 1px 5px rgb(255 255 255 / 20%), 0 2px 2px rgb(255 255 255 / 14%),
    0 3px 1px -2px rgb(255 255 255 / 12%);
}
</style>
