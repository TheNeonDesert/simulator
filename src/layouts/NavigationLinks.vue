<template>
  <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    elevated
    mini
    behavior="desktop"
    persistent
    no-swipe-backdrop
    no-swipe-open
    no-swipe-close
    class="bg-black"
    v-if="$q.screen.gt.sm"
  >
    <div class="side-menu">
      <main-menu />
      <div
        v-for="(item, idx) in menuItems"
        v-bind:key="idx"
        @click="routeTo(item)"
        :class="{
          'highlight-animation': showTutorial && item.name === 'Gather',
        }"
      >
        <q-icon :name="item.icon"></q-icon>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </q-drawer>

  <q-footer elevated class="bg-black" v-if="$q.screen.lt.md">
    <div class="footer-menu">
      <!-- TODO this div and the v-for div inside the side-menu are identical, abstract them out -->
      <div
        v-for="(item, idx) in menuItems"
        v-bind:key="idx"
        @click="routeTo(item)"
        :class="{
          'highlight-animation': showTutorial && item.name === 'Gather',
        }"
      >
        <q-icon :name="item.icon"></q-icon>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MainMenu from './MainMenu.vue';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

export default defineComponent({
  name: 'NavigationLinks',
  // Rename this NavigationLinks and MainMenu, it's not clear which is the actual primary
  components: { MainMenu },
  setup() {
    return {
      leftDrawerOpen: ref<boolean>(true),
      showTutorial: ref<boolean>(false),
      simulationStore: ref<SimulationStore>(null as unknown as SimulationStore),
      menuItems: ref<MenuItem[]>([
        {
          icon: 'img:icons/avatar-icon.png',
          name: 'Avatar',
          route: '/avatar',
        },
        {
          icon: 'img:icons/hammer-anvil-icon.png',
          name: 'Crafting',
          route: '/crafting',
        },
        {
          icon: 'img:icons/pickaxe-icon.png',
          name: 'Gather',
          route: '/gather',
        },
        {
          icon: 'img:icons/sword-icon.png',
          name: 'Combat',
          route: '/combat',
        },
        {
          icon: 'img:icons/chat-icon.png',
          name: 'Log',
          route: '/log',
        },
      ]),
    };
  },
  created: async function () {
    this.simulationStore = useSimulationStore();
    // const seen = localStorage.getItem('seenTutorial');
    // if (!seen || seen !== 'v003') {
    //   this.showWelcomeModal = true;
    //   localStorage.setItem('seenTutorial', 'v003');
    // }
    if (this.simulationStore.showTutorial === 1) {
      this.showTutorial = true;
    }
    // setTimeout(() => { this.showTutorial = false}, )
  },
  methods: {
    routeTo: function (item: MenuItem) {
      if (item.name === 'Gather' && this.simulationStore.showTutorial === 1) {
        this.showTutorial = false;
        this.simulationStore.showTutorial = 2;
      }
      this.$router.push(item.route);
    },
  },
});

interface MenuItem {
  icon: string;
  name: string;
  route: string;
}
</script>

<style lang="scss" scoped>
.side-menu {
  :deep(.q-icon) {
    margin-top: 20px;
    margin-left: 8px;
    font-size: 40px;
    cursor: pointer;
  }

  :deep(span) {
    display: block;
    text-align: center;
    font-size: 12px;
  }
}

.footer-menu {
  display: flex;
  height: 54px;
  justify-content: space-evenly;
  align-items: center;

  > div {
    .q-icon {
      margin-left: 6px;
      font-size: 24px;
      cursor: pointer;
    }

    span {
      display: block;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
