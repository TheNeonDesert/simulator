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
        <q-spinner-hourglass color="white" size="100px" />
      </q-card-section>
    </q-card>
  </q-dialog>

  <reward-screen
    :showRewardScreen="showRewardScreen"
    @update="showRewardScreen = $event"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RewardScreen from './RewardScreen.vue';

export default defineComponent({
  name: 'ActivityScreen',
  components: { RewardScreen },
  props: {
    showActivityScreen: {
      required: true,
      type: Boolean,
    },
  },
  setup() {
    return {
      showRewardScreen: ref<boolean>(false),
    };
  },
  watch: {
    showActivityScreen: function () {
      setTimeout(() => {
        this.$emit('update', false);
        this.showRewardScreen = true;
      }, 4000);
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
