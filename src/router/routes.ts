import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        children: [
          { path: '', redirect: 'avatar' },
          {
            path: 'avatar',
            component: () => import('pages/AvatarPage.vue'),
          },
          {
            path: 'crafting',
            component: () => import('pages/CraftingPage.vue'),
          },
          {
            path: 'gather',
            component: () => import('pages/GatherPage.vue'),
          },
          {
            path: 'combat',
            component: () => import('pages/CombatPage.vue'),
          },
          {
            path: 'log',
            component: () => import('pages/LogPage.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;
