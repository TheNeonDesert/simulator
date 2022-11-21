<template>
  <q-dialog
    :model-value="confirmResetModal"
    :update:model-value="update"
    @hide="update(false)"
  >
    <q-card class="bg-black text-white position-relative">
      <span class="close-icon" v-close-popup>
        <q-img src="icons/close-icon.png" />
      </span>
      <q-card-section class="q-pt-none">
        <h6>Reset Simulation</h6>
        <p>Are you sure you want to completely reset the simulation?</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          class="q-mr-md q-mb-md"
          flat
          label="cancel"
          color="white"
          v-close-popup
        />
        <q-btn
          class="q-mr-md q-mb-md"
          outline
          label="reset"
          color="white"
          @click="reset"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <version-history-modal
    :showVersionHistory="showVersionHistory"
    @update="showVersionHistory = $event"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VersionHistoryModal from '../modals/VersionHistoryModal.vue';
import simulatorService from '../services/simulator.service';
import Utils from 'src/services/utils';
import { ActionLogCategory } from 'src/models/ActionLog';

export default defineComponent({
  name: 'ConfirmResetModal',
  components: { VersionHistoryModal },
  props: {
    confirmResetModal: {
      required: true,
      type: Boolean,
    },
  },
  setup() {
    return {
      showVersionHistory: ref<boolean>(false),
    };
  },
  emits: ['update'],
  methods: {
    update: function (show: boolean) {
      this.$emit('update', show);
    },
    reset: function () {
      this.$router.push('/');
      simulatorService.reset();
      Utils.info('Simulation reset', ActionLogCategory.world);
      this.$emit('update', false);
    },
  },
});
</script>

<style scoped lang="scss"></style>
