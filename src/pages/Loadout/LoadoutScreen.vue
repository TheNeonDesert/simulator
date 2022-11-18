<template>
  <q-dialog
    :model-value="showLoadoutScreen"
    :update:model-value="update"
    @hide="update(false)"
  >
    <!-- TODO UI -->

    <!-- make it take up no more than full screen -->
    <!-- can make side by side when wide, or skinny 2 column bottom half -->

    <q-card class="bg-white text-white" style="max-width: 420px">
      <!-- width="400px" -->
      <!-- TODO make the img inside a div and set the div's size properly.. based on screen size I guess -->
      <!-- then for the img try to set it to fit="cover" -->
      <q-img
        style="width: 400px; margin: 10px 10px -10px 10px"
        src="images/locations/wilderness.jpg"
        fit="scale-down"
      />

      <div class="card-contents">
        <q-card-section class="q-pt-none">
          <h6 class="q-pt-md">Forage at The Wilderness</h6>

          <p
            v-html="
              'Forage for <u>sticks</u>, <u>stones</u>, <u>plant fibers</u>, and <u>apples</u>. Watch out for <b>wolves</b> though! You might want to bring a <i>dagger</i>...'
            "
          />

          <q-input
            v-model.number="duration"
            label="Duration (minutes)"
            type="number"
            outlined
            label-color="white"
          />

          <EquippableItemSlot equipmentKey="meleeWeapon" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            outline
            label="forage"
            color="white"
            v-close-popup
            @click="doit"
          />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EquippableItemSlot from './EquippableItemSlot.vue';

export default defineComponent({
  name: 'LoadoutScreen',
  components: { EquippableItemSlot },
  props: {
    showLoadoutScreen: {
      required: true,
      type: Boolean,
    },
  },
  setup() {
    return {
      duration: ref<number>(60),
    };
  },
  emits: ['update'],
  methods: {
    update: function (show: boolean) {
      this.$emit('update', show);
    },
    doit: function () {
      // check to make sure you can go to location and all the settings are good
      // show spinner on a timeout, "this.duration" minutes later...
      // <q-spinner-hourglass />
      // then show rewards screen
    },
  },
});
// resourceGatheringService.forageAtWilderness(
//               this.duration
//             );
</script>

<style scoped lang="scss">
.card-contents {
  background-color: $page-backround;
  // box-shadow: 0 2px 37px 0 rgba(87, 152, 181, 0.6);
  // border: solid 1px var(--teal-500);
  padding-bottom: 10px;
}
</style>
