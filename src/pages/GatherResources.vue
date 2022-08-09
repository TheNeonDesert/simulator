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
import _ from 'underscore';
import Utils from 'src/services/utils';
import resourceGatheringService from 'src/services/resource-gathering.service';

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
    displayResults: function (results: string[]) {
      _.each(results, (notification) => {
        if (notification.startsWith('ALERT::')) {
          Utils.error(notification.substring(7));
        } else {
          Utils.notify(notification);
        }
      });
    },
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
