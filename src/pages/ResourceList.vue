<template>
  <div>
    <h6>Resources</h6>
    <ul>
      <li>stone: {{ toTwoDecimal(walletStore.stone) }}</li>
      <li>stick: {{ toTwoDecimal(walletStore.stick) }}</li>
      <li>plant fiber: {{ toTwoDecimal(walletStore.plantFiber) }}</li>
      <li>apple: {{ toTwoDecimal(walletStore.apple) }}</li>
      <li>wolf pelt: {{ walletStore.wolfPelt }}</li>
    </ul>
    <ul>
      <li>cedar log: {{ toTwoDecimal(walletStore.cedarLog) }}</li>
      <li>pine tar: {{ toTwoDecimal(walletStore.pineTar) }}</li>
      <li>eagle feather: {{ toTwoDecimal(walletStore.eagleFeather) }}</li>
      <li>copper ore: {{ toTwoDecimal(walletStore.copperOre) }}</li>
      <li>gem: {{ walletStore.gem }}</li>
    </ul>
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
    };
  },
  created: async function () {
    this.walletStore = useWalletStore();
  },
  methods: {
    toTwoDecimal: function (number: number) {
      return Utils.toTwoDecimal(number);
    },
  },
});
</script>

<style scoped lang="scss"></style>
