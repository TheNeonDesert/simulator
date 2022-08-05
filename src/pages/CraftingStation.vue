<template>
  <div>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import simulator from '../services/simulator.service';
import Utils from 'src/services/utils';

export default defineComponent({
  name: 'CraftingStation',
  setup() {
    return {
      craftableItems: ref<
        {
          label: string;
          itemKey: string;
          onclick: (itemKey: string) => void;
        }[]
      >(),
    };
  },
  created: async function () {
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
  },
  methods: {
    craft: function (itemKey: string) {
      try {
        simulator.craft(itemKey);
        Utils.notify(`${itemKey} crafted`);
      } catch (err) {
        Utils.error(err as string);
      }
    },
    repairAllItems: function () {
      null;
    },
  },
});
</script>

<style scoped lang="scss"></style>
