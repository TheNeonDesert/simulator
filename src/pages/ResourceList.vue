<template>
  <div>
    <h6>Resources</h6>
    <div class="row">
      <div class="col-6" v-for="(value, key) in resources" v-bind:key="key">
        <q-list bordered separator dense>
          <q-item v-for="resource in value" v-bind:key="resource.key">
            <q-item-section>
              <q-item-label class="text-capitalize">{{
                resource.label
              }}</q-item-label>
              <div>{{ toTwoDecimal(walletStore[resource.key]) }}</div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { WalletStore, useWalletStore } from 'src/stores/wallet.store';
import Utils from 'src/services/utils';

export default defineComponent({
  name: 'ResourceList',
  setup() {
    return {
      walletStore: ref<WalletStore>(null as unknown as WalletStore),
      resources: ref<{ [key: string]: { label: string; key: string }[] }>(),
    };
  },
  created: async function () {
    this.walletStore = useWalletStore();
    this.resources = {
      t1: [
        { label: 'stone', key: 'stone' },
        { label: 'stick', key: 'stick' },
        { label: 'plant fiber', key: 'plantFiber' },
        { label: 'apple', key: 'apple' },
        { label: 'wolf pelt', key: 'wolfPelt' },
      ],
      t2: [
        { label: 'cedar log', key: 'cedarLog' },
        { label: 'pine tar', key: 'pineTar' },
        { label: 'eagle feather', key: 'eagleFeather' },
        { label: 'copper ore', key: 'copperOre' },
        { label: 'ruby', key: 'ruby' },
      ],
    };
  },
  methods: {
    toTwoDecimal: function (number: number) {
      return Utils.toTwoDecimal(number);
    },
  },
});
</script>

<style scoped lang="scss">
.q-item__label {
  color: gray;
}
</style>
