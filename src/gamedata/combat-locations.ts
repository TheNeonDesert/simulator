import { CombatLocation } from 'src/models/CombatLocation';

class GoblinEncampment implements CombatLocation {
  name = 'Goblin Encampment';
  enemies = [
    {
      order: 1,
      enemyKey: 'goblin',
      quantity: 7,
    },
    {
      order: 2,
      enemyKey: 'goblinChieftan',
      quantity: 1,
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
