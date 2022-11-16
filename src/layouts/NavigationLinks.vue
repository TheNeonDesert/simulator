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
        @click="$router.push(item.route)"
      >
        <q-icon :name="item.icon"></q-icon>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </q-drawer>

  <q-footer elevated class="bg-black" v-if="$q.screen.lt.md">
    <div class="footer-menu">
      <div
        v-for="(item, idx) in menuItems"
        v-bind:key="idx"
        @click="$router.push(item.route)"
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

export default defineComponent({
  name: 'NavigationLinks',
  components: { MainMenu },
  setup() {
    return {
      leftDrawerOpen: ref<boolean>(true),
      menuItems: ref<{ icon: string; name: string; route: string }[]>([
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
});
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
