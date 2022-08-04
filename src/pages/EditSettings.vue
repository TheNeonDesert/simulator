<template>
  <q-page class="q-pa-lg">
    <h4>Edit Settings</h4>
    <div
      v-for="(fieldGroup, groupName) in settingsFields"
      v-bind:key="groupName"
      style="width: 400px"
    >
      <h6>{{ groupName }}</h6>
      <div v-for="field in fieldGroup" v-bind:key="field.field">
        <q-input
          v-model.number="settingsStore[field.field]"
          :label="field.display"
          type="number"
          outlined
          dense
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';

export default defineComponent({
  name: 'EditSettings',
  setup() {
    return {
      settingsStore: ref<SettingsStore>(null as unknown as SettingsStore),
      settingsFields: ref<{
        [group: string]: {
          field: string;
          display: string;
        }[];
      } | null>(),
    };
  },
  created: async function () {
    this.settingsStore = useSettingsStore();

    // this.settingsFields = _.groupBy(
    this.settingsFields = {
      General: [
        {
          field: 'carryingCapacity',
          display: 'Carrying Capacity',
        },
      ],
      'Starting Resources': [
        {
          field: 'startingStone',
          display: 'Starting Stone',
        },
        {
          field: 'startingStick',
          display: 'Starting Stick',
        },
        {
          field: 'startingPlantFiber',
          display: 'Starting Plant Fiber',
        },
        {
          field: 'startingApple',
          display: 'Starting Apple',
        },
      ],
      'Wilderness Actions': [
        {
          field: 'stickGainedPerAction',
          display: 'Stick gained per action',
        },
        {
          field: 'stoneGainedPerAction',
          display: 'Stone gained per action',
        },
        {
          field: 'plantFiberGainedPerAction',
          display: 'Plant fiber gained per action',
        },
        {
          field: 'appleGainedPerAction',
          display: 'Apple gained per action',
        },
        {
          field: 'chanceWolfAttackPerAction',
          display: 'Chances per action of a wolf attack',
        },
      ],

      'Wilderness Item Bonuses': [
        {
          field: 'additionalCapacityFromLeatherSack',
          display: 'Addtl carry capacity from leather sack',
        },
      ],

      'Wilderness Item Requirements': [
        {
          field: 'craftStoneDaggerRequiredStone',
          display: 'Stone dagger, required stone',
        },
        {
          field: 'craftLeatherSackRequiredPlantFiber',
          display: 'Leather sack, required plant fiber',
        },
        {
          field: 'craftLeatherSackRequiredWolfPelts',
          display: 'Leather sack, required wolf pelts',
        },
        {
          field: 'craftStoneAxeRequiredPlantFiber',
          display: 'Stone axe, required plant fiber',
        },
        {
          field: 'craftStoneAxeRequiredStone',
          display: 'Stone axe, required stone',
        },
        {
          field: 'craftStoneAxeRequiredSticks',
          display: 'Stone axe, required stick',
        },
        {
          field: 'craftStonePickAxeRequiredPlantFiber',
          display: 'Stone pickaxe, required plant fiber',
        },
        {
          field: 'craftStonePickAxeRequiredStone',
          display: 'Stone pickaxe, required stone',
        },
        {
          field: 'craftStonePickAxeRequiredSticks',
          display: 'Stone pickaxe, required stick',
        },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
h4 {
  margin: 20px auto;
}
h6 {
  margin: 10px auto;
}
</style>
