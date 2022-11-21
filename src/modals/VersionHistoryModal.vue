<template>
  <q-dialog
    :model-value="showVersionHistory"
    :update:model-value="update"
    @hide="update(false)"
  >
    <q-card class="bg-black text-white">
      <span class="close-icon" v-close-popup>
        <q-img src="icons/close-icon.png" />
      </span>
      <q-card-section>
        <h6>0.0.3</h6>
        <ul>
          <li>new styling and layout</li>
          <li>equip items by slot</li>
        </ul>
        <h6>0.0.2</h6>
        <ul>
          <li>more info for user on what's going on and what to do</li>
          <li>inventory management</li>
          <li>auto heal and auto repair</li>
        </ul>
        <h6>0.0.1</h6>
        <ul>
          <li>initial release</li>
          <li>basic resources, items, crafting, durability</li>
          <li>wilderness, cedar forest, copper ore, goblin encampment</li>
        </ul>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          class="q-mr-md q-mb-md"
          outline
          label="OK"
          color="white"
          v-close-popup
          style="margin-top: auto"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VersionHistoryModal',
  props: {
    showVersionHistory: {
      required: true,
      type: Boolean,
    },
  },
  emits: ['update'],
  methods: {
    update: function (show: boolean) {
      this.$emit('update', show);
    },
  },
});
</script>

<style scoped lang="scss"></style>
