const craftableItemCosts: {
  [itemKey: string]: { resourceKey: string; settingQuantityKey: string }[];
} = {
  leatherSack: [
    {
      resourceKey: 'plantFiber',
      settingQuantityKey: 'craftLeatherSackRequiredPlantFiber',
    },
    {
      resourceKey: 'wolfPelt',
      settingQuantityKey: 'craftLeatherSackRequiredWolfPelt',
    },
  ],
  stoneDagger: [
    {
      resourceKey: 'stone',
      settingQuantityKey: 'craftStoneDaggerRequiredStone',
    },
  ],
  stoneAxe: [
    {
      resourceKey: 'plantFiber',
      settingQuantityKey: 'craftStoneAxeRequiredPlantFiber',
    },
    {
      resourceKey: 'stone',
      settingQuantityKey: 'craftStoneAxeRequiredStone',
    },
    {
      resourceKey: 'stick',
      settingQuantityKey: 'craftStoneAxeRequiredStick',
    },
  ],
  stonePickaxe: [
    {
      resourceKey: 'plantFiber',
      settingQuantityKey: 'craftStonePickAxeRequiredPlantFiber',
    },
    {
      resourceKey: 'stone',
      settingQuantityKey: 'craftStonePickAxeRequiredStone',
    },
    {
      resourceKey: 'stick',
      settingQuantityKey: 'craftStonePickAxeRequiredStick',
    },
  ],
  sling: [
    {
      resourceKey: 'plantFiber',
      settingQuantityKey: 'craftSlingRequiredPlantFiber',
    },
    {
      resourceKey: 'wolfPelt',
      settingQuantityKey: 'craftSlingRequiredWolfPelt',
    },
  ],
  copperSword: [
    {
      resourceKey: 'copperOre',
      settingQuantityKey: 'craftCopperSwordRequiredCopperOre',
    },
    {
      resourceKey: 'wolfPelt',
      settingQuantityKey: 'craftCopperSwordRequiredWolfPelt',
    },
    {
      resourceKey: 'plantFiber',
      settingQuantityKey: 'craftCopperSwordRequiredPlantFiber',
    },
  ],
  cedarCopperAxe: [
    {
      resourceKey: 'copperOre',
      settingQuantityKey: 'craftCedarCopperAxeRequiredCopperOre',
    },
    {
      resourceKey: 'cedarLog',
      settingQuantityKey: 'craftCedarCopperAxeRequiredCedarLog',
    },
    {
      resourceKey: 'wolfPelt',
      settingQuantityKey: 'craftCedarCopperAxeRequiredWolfPelt',
    },
  ],
  cedarCopperPickaxe: [
    {
      resourceKey: 'copperOre',
      settingQuantityKey: 'craftCedarCopperPickaxeRequiredCopperOre',
    },
    {
      resourceKey: 'cedarLog',
      settingQuantityKey: 'craftCedarCopperPickaxeRequiredCedarLog',
    },
    {
      resourceKey: 'wolfPelt', // TODO maybe just convert wolfPelt to leather? and simplify resources..
      settingQuantityKey: 'craftCedarCopperPickaxeRequiredWolfPelt',
    },
  ],
};

export default craftableItemCosts;

// case 'wheelBarrow':
//   break;
