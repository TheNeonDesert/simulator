import { defineStore } from 'pinia';

export const useAvatarStore = defineStore('avatar', {
  state: (): AvatarStore => ({
    health: 100, // TODO move to setting
    skills: {
      woodcutting: 1,
      mining: 1,
      swordsmanship: 1,
      exploration: 1,
    },
  }),
});

export interface AvatarStore {
  health: number;
  skills: { [skill: string]: number };
}
