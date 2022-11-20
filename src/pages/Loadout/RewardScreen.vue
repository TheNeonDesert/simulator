<template>
  <q-dialog
    :model-value="showRewardScreen"
    :update:model-value="update"
    @hide="update(false)"
  >
    <q-card class="bg-black text-white">
      <q-card-section class="q-pt-none">
        <h6>Rewards</h6>
        <div class="q-pa-xs bg-white">
          <q-img src="images/reward-chest.jpg" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
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
