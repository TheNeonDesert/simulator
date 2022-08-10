<template>
  <div>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import combatService from '../services/combat.service';
import _ from 'underscore';
import Utils from 'src/services/utils';

export default defineComponent({
  name: 'CombatEncounters',
  setup() {
    return {
      combatEncounters: ref<
        {
          label: string;
          onclick: () => void;
        }[]
      >(),
    };
  },
  created: async function () {
    this.combatEncounters = [
      { label: 'goblin encampment', onclick: this.raidGoblinEncampment },
      // { label: 'cemetary', onclick: this.raidCemetary },
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

    raidGoblinEncampment: function () {
      try {
        const results = combatService.findAndRaidGoblinEncampment();
        this.displayResults(results);
      } catch (err) {
        Utils.error(err as string);
      }
    },
    raidCemetary: function () {
      null;
    },
  },
});
</script>

<style scoped lang="scss"></style>
