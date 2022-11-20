<template>
  <q-dialog
    :model-value="showLoadoutScreen"
    :update:model-value="update"
    @hide="update(false)"
  >
    <q-card class="bg-black text-white position-relative">
      <span class="close-icon" v-close-popup>
        <q-img src="icons/close-icon.png" />
      </span>
      <q-card-section class="q-pt-none">
        <h6 class="q-pt-md">Forage at The Wilderness</h6>
        <div class="q-pa-xs bg-white">
          <q-img src="images/locations/wilderness.jpg" />
        </div>

        <p
          class="text-center text-italic q-mx-lg q-mt-md"
          v-html="
            'Forage for <u>sticks</u>, <u>stones</u>, <u>plant fibers</u>, and <u>apples</u>. Watch out for <b>wolves</b> though! You may want to bring a <i>dagger</i>...'
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
          class="q-mr-md q-mb-md"
          outline
          label="forage"
          color="white"
          v-close-popup
          @click="forage"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <activity-screen
    :showActivityScreen="showActivityScreen"
    @update="showActivityScreen = $event"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EquippableItemSlot from './EquippableItemSlot.vue';
import ActivityScreen from './ActivityScreen.vue';

export default defineComponent({
  name: 'LoadoutScreen',
  components: { EquippableItemSlot, ActivityScreen },
  props: {
    showLoadoutScreen: {
      required: true,
      type: Boolean,
    },
  },
  setup() {
    return {
      duration: ref<number>(60),
      showActivityScreen: ref<boolean>(false),
    };
  },
  emits: ['update'],
  methods: {
    update: function (show: boolean) {
      this.$emit('update', show);
    },
    forage: function () {
      // check to make sure you can go to location and all the settings are good
      // show spinner on a timeout, "this.duration" minutes later...
      // <q-spinner-hourglass />
      // then show rewards screen
      this.$emit('update', false);
      this.showActivityScreen = true;
    },
  },
});
// resourceGatheringService.forageAtWilderness(
//               this.duration
//             );
</script>

<style scoped lang="scss">
// TODO move all this to a more generic TND-Modal component with a <slot></slot>
.close-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  margin: 10px;
  z-index: 3;
  cursor: pointer;
}

.q-card {
  @media (max-width: $breakpoint-sm-max) {
    padding-top: 25px;
  }
}

:deep(.q-field--outlined:not(.q-field--focused) .q-field__control:before) {
  border: 1px solid $white;
}
:deep(.q-field--outlined .q-field__control:before) {
  border: 1px solid $white;
}
:deep(.q-field--outlined:hover .q-field__control:before) {
  border: 1px solid $white;
}
</style>
