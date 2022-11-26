<template>
  <q-layout view="hHh LpR fFf" class="default-text">
    <header-section />
    <navigation-links />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <welcome-modal
    :showWelcomeModal="showWelcomeModal"
    @update="showWelcomeModal = $event"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HeaderSection from './HeaderSection.vue';
import NavigationLinks from './NavigationLinks.vue';
import WelcomeModal from '../modals/WelcomeModal.vue';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

export default defineComponent({
  name: 'MainLayout',
  components: { HeaderSection, NavigationLinks, WelcomeModal },
  setup() {
    return {
      showWelcomeModal: ref<boolean>(false),
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
    const seen = localStorage.getItem('seenTutorial');
    if (!seen || seen !== 'v003') {
      this.showWelcomeModal = true;
      localStorage.setItem('seenTutorial', 'v003');
      this.simulationStore.showTutorial = 1;
    }
  },
  // setup() {
  // TODO setup site-wide resizer capturer and set screen size to xs, sm, md, lg, etc... and also set height
  // then can customize UI all around based on that
  // window.addEventListener('resize', () => {
  // console.log('resized'); -> // update store
  // screen width:     mobile, tablet, laptop, huge, and short versions for each
  // just save it to a store, and make it easy to consume
  // });

  // TODO add site analytics
  // },
});
</script>

<style lang="scss" scoped></style>
