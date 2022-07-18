<template>
  <q-input
    v-if="settingsStore"
    v-model.number="modelNumberValue"
    @update:model-value="$emit('updated', $event)"
    :label="label"
    type="number"
  >
    <template v-slot:label>
      <div class="row items-center all-pointer-events">
        {{ label }}
        <q-icon class="q-mr-xs" color="primary" name="info" />
        <q-tooltip>{{ description }}</q-tooltip>
      </div>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';

export default defineComponent({
  name: 'SNumberInput',
  components: {},
  setup() {
    return {
      settingsStore: ref<SettingsStore>(),
      modelNumberValue: ref<number>(),
    };
  },
  props: {
    model: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  emits: ['updated'],
  created: async function () {
    this.settingsStore = useSettingsStore();

    this.modelNumberValue = this.model;
  },
});
</script>
