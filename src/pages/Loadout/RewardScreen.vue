<template>
  <q-dialog
    :model-value="showInfoDialog"
    :update:model-value="update"
    @hide="update(false)"
  >
    load screen here wilderness pick your avatar want to bring a dagger? ->
    rewards screen this many wolf attacks, losing this many resources and
    whatever wolf pelts and this much stuff gained

    <q-card class="bg-black text-white">
      <q-card-section class="q-pt-none">
        <h6>simulator</h6>
        <ul>
          <li>Neon</li>
        </ul>
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
  name: 'LoadoutScreen',
  props: {
    showInfoDialog: {
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
