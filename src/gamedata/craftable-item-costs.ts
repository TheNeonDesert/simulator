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
};

export default craftableItemCosts;

// case 'cedarCopperAxe':
//   // craftCedarCopperAxeRequiredCopper
//   // craftCedarCopperAxeRequiredCedar
//   break;
// case 'cedarCopperPickaxe':
//   // craftCedarCopperPickaxeRequiredCopper
//   // craftCedarCopperPickaxeRequiredCedar
//   break;
// case 'cedarCopperSword':
//   // craftCedarCopperSwordRequiredCopper
//   // craftCedarCopperSwordRequiredCedar
//   break;
// case 'wheelBarrow':
//   break;
