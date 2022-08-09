import { defineStore } from 'pinia';

export const useWalletStore = defineStore('wallet', {
  state: (): WalletStore => ({
    stone: 0,
    stick: 0,
    plantFiber: 0,
    apple: 0,
    wolfPelt: 0,
    copperOre: 0,
    cedarLog: 0,
    eagleFeather: 0,
    pineTar: 0,
    ruby: 0,

    stoneDagger: 0,
    leatherSack: 0,
    // stoneAxe: 0,
    // stonePickaxe: 0,

    // cedarBow: 0,
    cedarCopperArrow: 0,
  }),
});

export interface WalletStore {
  [key: string]: number;

  stone: number;
  stick: number;
  plantFiber: number;
  apple: number;
  wolfPelt: number;
  copperOre: number;
  cedarLog: number;
  eagleFeather: number;
  pineTar: number;
  ruby: number;

  stoneDagger: number;
  leatherSack: number;
  // stoneAxe: number;
  // stonePickaxe: number;

  // cedarBow: number;
  cedarCopperArrow: number;
}
