import { defineStore } from 'pinia';
import _ from 'underscore';

export const useAvatarStore = defineStore('avatar', {
  state: (): AvatarStore => ({
    health: 100, // TODO move to setting
    skills: {
      woodcutting: 1,
      mining: 1,
      swordsmanship: 1,
      exploration: 1,
    },
    equippedItemIds: {
      axe: null,
      pickaxe: null,
      meleeWeapon: null,
      rangedWeapon: null,
    },
  }),
  getters: {
    isItemEquipped: (state) => {
      return (itemIdToCheck: number): boolean => {
        let isEquipped = false;
        _.each(state.equippedItemIds, (equippedItemId) => {
          if (itemIdToCheck === equippedItemId) {
            isEquipped = true;
          }
        });
        return isEquipped;
      };
    },
  },
});

export interface AvatarStore {
  health: number;
  skills: { [skill: string]: number };
  equippedItemIds: { [itemName: string]: number | null };
  isItemEquipped?: (itemIdToCheck: number) => boolean;
}
