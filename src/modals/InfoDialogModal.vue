<template>
  <q-dialog
    :model-value="showInfoDialog"
    :update:model-value="update"
    @hide="update(false)"
  >
    <q-card>
      <q-card-section class="q-pt-none">
        <h6>This simulator is awesome</h6>
        <p>To be built next</p>
        <ul>
          <li>Stats, str dex int</li>
          <li>Skills, woodcutting mining etc</li>
          <li>Avatar recompile</li>
          <li>Neon cost</li>
        </ul>
        <p>Current limitations or issues</p>
        <ul>
          <li>
            Only supports one avatar and all stats/items/etc are for that one
            avatar
          </li>
          <li>Unlimited bags lead to unlimited carrying capacity</li>
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
  name: 'InfoDialogModal',
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
