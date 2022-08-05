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
      <q-btn
        :label="resource.label"
        @click="resource.onclick"
        color="primary"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import simulator from '../services/simulator.service';
import _ from 'underscore';
import Utils from 'src/services/utils';

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
          onclick: () => void;
        }[]
      >(),
    };
  },
  created: async function () {
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
  },
  methods: {
    forageAtWilderness: function () {
      try {
        const results = simulator.forageAtWilderness(
          this.durationModels.forageAtWildernessDuration
        );
        _.each(results, (notification) => Utils.notify(notification));
      } catch (err) {
        Utils.error(err as string);
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
  },
});
</script>

<style scoped lang="scss"></style>
