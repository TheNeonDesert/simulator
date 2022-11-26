<template>
  <q-dialog
    :model-value="showActivityScreen"
    :update:model-value="update"
    @hide="update(false)"
  >
    <q-card class="bg-black text-white">
      <q-card-section class="q-pt-none">
        <h6>Foraging...</h6>
        <div class="q-pa-xs bg-white">
          <q-img src="images/foraging.jpg" />
        </div>
        <div class="full-width text-center">
          <q-spinner class="q-my-lg" color="white" size="50px" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <reward-screen
    v-if="results"
    :results="results"
    :showRewardScreen="showRewardScreen"
    @update="showRewardScreen = $event"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RewardScreen from './RewardScreen.vue';
import resourceGatheringService from 'src/services/resource-gathering.service';

export default defineComponent({
  name: 'ActivityScreen',
  components: { RewardScreen },
  props: {
    showActivityScreen: {
      required: true,
      type: Boolean,
    },
    duration: {
      required: true,
      type: Number,
    },
  },
  setup() {
    return {
      showRewardScreen: ref<boolean>(false),
      results: ref<string[]>(),
    };
  },
  watch: {
    showActivityScreen: function () {
      if (this.showActivityScreen) {
        this.results = resourceGatheringService.forageAtWilderness(
          this.duration
        );
        setTimeout(() => {
          this.$emit('update', false);
          this.showRewardScreen = true;
        }, 3000);
      }
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
