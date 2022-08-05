import { Item } from 'src/models/Item';

export class StoneAxe implements Item {
  name = 'Stone Axe';
  durability = 20;
  startingDurability = 20;
  actionKeys = ['chop'];
  type = ['axe', 'resourceGatherer'];
  actions = {
    chop: {
      type: 'gatherWood',
      skill: 'woodcutting',
      name: 'Chop',
      actionPointDuration: 1,
      durabilityUsed: 1,
    },
  };
  // TODO production multiplier or stone vs cedarCopper?
}
export class CedarCopperAxe implements Item {
  name = 'Copper Cedar Axe';
  durability = 60;
  startingDurability = 60;
  actionKeys = ['chop'];
  type = ['axe', 'resourceGatherer'];
  actions = {
    chop: {
      type: 'gatherWood',
      skill: 'woodcutting',
      name: 'Chop',
      actionPointDuration: 1,
      durabilityUsed: 1,
    },
  };
}

export class StonePickaxe implements Item {
  name = 'Stone Pickaxe';
  durability = 20;
  startingDurability = 20;
  actionKeys = ['mine'];
  type = ['pickaxe', 'resourceGatherer'];
  actions = {
    mine: {
      type: 'mineOre',
      skill: 'mining',
      name: 'Mine',
      actionPointDuration: 1,
      durabilityUsed: 1,
    },
  };
}
export class CedarCopperPickaxe implements Item {
  name = 'Copper Cedar Pickaxe';
  durability = 60;
  startingDurability = 60;
  actionKeys = ['mine'];
  type = ['pickaxe', 'resourceGatherer'];
  actions = {
    mine: {
      type: 'mineOre',
      skill: 'mining',
      name: 'Mine',
      actionPointDuration: 1,
      durabilityUsed: 1,
    },
  };
}

export class CopperSword implements Item {
  name = 'Copper Sword';
  durability = 80;
  startingDurability = 80;
  actionKeys = ['swing'];
  type = ['sword', 'weapon'];
  actions = {
    swing: {
      type: 'meleeAttack',
      skill: 'swordsmanship',
      name: 'Swing',
      actionPointDuration: 2,
      durabilityUsed: 2,
    },
  };
  baseDamage = 8;
}
