<template>
  <q-dialog
    :model-value="showRewardScreen"
    :update:model-value="update"
    @hide="update(false)"
  >
    <q-card class="bg-black text-white position-relative">
      <span class="close-icon" v-close-popup>
        <q-img src="icons/close-icon.png" />
      </span>

      <q-card-section class="q-pt-none">
        <h6>Rewards</h6>
        <div class="q-pa-xs bg-white">
          <q-img src="images/reward-chest.jpg" />
        </div>
      </q-card-section>

      <q-list
        ><q-item v-for="(result, idx) in results" :key="idx">{{
          result
        }}</q-item></q-list
      >

      <q-card-actions align="right">
        <q-btn
          class="q-mr-md q-mb-md"
          outline
          label="OK"
          color="white"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RewardScreen',
  props: {
    showRewardScreen: {
      required: true,
      type: Boolean,
    },
    results: {
      required: true,
      type: Array,
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
