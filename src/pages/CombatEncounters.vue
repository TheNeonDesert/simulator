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
      { label: 'cemetary', onclick: this.raidCemetary },
    ];
  },
  methods: {
    raidGoblinEncampment: function () {
      null;
    },
    raidCemetary: function () {
      null;
    },
  },
});
</script>

<style scoped lang="scss"></style>
