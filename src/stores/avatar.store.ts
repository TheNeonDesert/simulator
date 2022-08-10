import { defineStore } from 'pinia';

export const useAvatarStore = defineStore('avatar', {
  state: (): AvatarStore => ({
    health: 100, // TODO move to setting
  }),
});

export interface AvatarStore {
  health: number;
}
