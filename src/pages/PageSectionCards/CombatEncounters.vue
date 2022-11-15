<template>
  <div>
    <h6>Combat Encounters</h6>

    <q-card
      v-for="encounter in combatEncounters"
      v-bind:key="encounter.label"
      class="row q-my-md combat-encounter"
    >
      <div class="q-ma-md">
        <div class="row">
          <p v-html="encounter.description" />
        </div>
        <div class="row">
          <q-btn
            :label="encounter.label"
            @click="encounter.onclick()"
            color="primary"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import combatService from 'src/services/combat.service';
import _ from 'underscore';
import Utils from 'src/services/utils';

export default defineComponent({
  name: 'CombatEncounters',
  setup() {
    return {
      combatEncounters: ref<
        {
          label: string;
          description: string;
          onclick: () => void;
        }[]
      >(),
    };
  },
  created: async function () {
    this.combatEncounters = [
      {
        label: 'goblin encampment',
        description:
          'Raid the Goblin Encampment. Make sure you have a strong weapon!',
        onclick: this.raidGoblinEncampment,
      },
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

<style scoped lang="scss">
.combat-encounter {
  background-color: $page-backround;
  box-shadow: 0 1px 5px rgb(255 255 255 / 20%), 0 2px 2px rgb(255 255 255 / 14%),
    0 3px 1px -2px rgb(255 255 255 / 12%);
}
</style>
