import { CombatLocation, CombatReward } from 'src/models/CombatLocation';

class GoblinEncampment implements CombatLocation {
  name = 'Goblin Encampment';
  enemies = [
    {
      order: 1,
      enemyKey: 'goblin',
      quantity: 7,
      generateReward: (): CombatReward => {
        const rand = Math.random() * 100;
        if (rand >= 97) {
          return {
            resourceKey: 'ruby',
            resourceQuantity: 1,
          };
        } else if (rand >= 90) {
          return {
            resourceKey: 'copperOre',
            resourceQuantity: 20,
          };
        } else if (rand >= 50) {
          return {
            resourceKey: 'stone',
            resourceQuantity: 10,
          };
        } else {
          return {};
        }
      },
    },
    {
      order: 2,
      enemyKey: 'goblinChieftan',
      quantity: 1,
      generateReward: (): CombatReward => {
        const rand = Math.random() * 100;
        if (rand >= 97) {
          return {
            craftableItemKey: 'goblinSpear',
          };
        } else if (rand >= 90) {
          return {
            resourceKey: 'ruby',
            resourceQuantity: 1,
          };
        } else if (rand >= 50) {
          return {
            resourceKey: 'copperOre',
            resourceQuantity: 20,
          };
        } else {
          return {
            resourceKey: 'stone',
            resourceQuantity: 10,
          };
        }
      },
    },
  ];
}

const combatLocations: {
  [locationKey: string]: CombatLocation;
} = {
  goblinEncampment: new GoblinEncampment(),
};

export default combatLocations;

export const enemies: { [enemyKey: string]: Enemy } = {
  goblin: {
    name: 'Goblin',
    health: 8,
    damage: 2,
  },
  goblinChieftan: {
    name: 'Goblin Chieftan',
    health: 40,
    damage: 5,
  },
};

export interface Enemy {
  name: string;
  health: number;
  damage: number;
}
