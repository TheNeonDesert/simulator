import { Item } from 'src/models/Item';

// TODO item ideas...

// pineTar: add pineTar to items to increase its durability? TODO or maybe replace pine tar?
// eagleFeather: feathers + cedar + copper for copperCedarArrows
// ruby: insert into weapons or items for increased productivity/damage?

// goblinSpear TODO make this work

let itemIdIndex = 0;

type ctor<T> = {
  new (id: number, attributes: { [attribute: string]: number }): T;
};
abstract class ItemFactory {
  static create<T>(
    attributes: { [attribute: string]: number },
    ctor: ctor<T>
  ): T {
    return new ctor(itemIdIndex++, attributes) as T;
  }
}

// TODO maybe maybe... create a master ItemFactory which adds all the settings
//  resources costs info etc from a json object and generates all the file additions we need?

// TODO add a `explanation` param and maybe a graphic, ex...
// The Stone Axe is used to chop wood at any forest. Forage at the Wilderness for the required resources.

abstract class CItem implements Item {
  id;
  attributes;
  abstract key: string;
  abstract name: string;
  abstract durability: number;
  abstract startingDurability: number;
  abstract actionKeys: string[];
  abstract type: string[];
  abstract actions: { [actionKey: string]: Action };

  constructor(id: number, attributes: { [attribute: string]: number }) {
    this.id = id;
    this.attributes = attributes;
  }
}

// Utilities

class LeatherSack extends CItem {
  key = 'leatherSack';
  name = 'Leather Sack';
  durability = 1;
  startingDurability = 1;
  actionKeys = [];
  type = ['bag'];
  actions = {};
}

// Axes

class StoneAxe extends CItem {
  key = 'stoneAxe';
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

class CedarCopperAxe extends CItem {
  key = 'cedarCopperAxe';
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
  // TODO production multiplier or stone vs cedarCopper?
}

// Pickaxes

class StonePickaxe extends CItem {
  key = 'stonePickaxe';
  name = 'Stone Pickaxe';
  durability = 20;
  startingDurability = 20;
  actionKeys = ['dig'];
  type = ['pickaxe', 'resourceGatherer'];
  actions = {
    dig: {
      type: 'mineOre',
      skill: 'mining',
      name: 'Dig',
      actionPointDuration: 1,
      durabilityUsed: 1,
    },
  };
}

class CedarCopperPickaxe extends CItem {
  key = 'cedarCopperPickaxe';
  name = 'Copper Cedar Pickaxe';
  durability = 60;
  startingDurability = 60;
  actionKeys = ['dig'];
  type = ['pickaxe', 'resourceGatherer'];
  actions = {
    dig: {
      type: 'mineOre',
      skill: 'mining',
      name: 'Dig',
      actionPointDuration: 1,
      durabilityUsed: 1,
    },
  };
  // TODO make it somehow have more production than the StonePickaxe
}

// Melee Weapons

class StoneDagger extends CItem {
  key = 'stoneDagger';
  name = 'Stone Dagger';
  durability = 4;
  startingDurability = 4;
  actionKeys = ['stab'];
  type = ['dagger', 'weapon', 'melee'];
  actions = {
    stab: {
      type: 'meleeAttack',
      name: 'Chop',
      actionPointDuration: 1,
      durabilityUsed: 1,
    },
  };
}

class CopperSword extends CItem {
  key = 'copperSword';
  name = 'Copper Sword';
  durability = 80;
  startingDurability = 80;
  actionKeys = ['swing'];
  type = ['sword', 'weapon', 'melee'];
  actions = {
    swing: {
      type: 'meleeAttack',
      skill: 'swordsmanship',
      name: 'Swing',
      actionPointDuration: 2, // TODO need to implement
      durabilityUsed: 2,
    },
  };
  baseDamage = 8;
}

class GoblinSpear extends CItem {
  key = 'goblinSpear';
  name = 'Goblin Spear';
  durability = 120;
  startingDurability = 120;
  actionKeys = ['swing'];
  type = ['spear', 'weapon', 'melee'];
  actions = {
    swing: {
      type: 'meleeAttack',
      skill: 'swordsmanship', // TODO refactor goblin spear...
      name: 'Swing',
      actionPointDuration: 2, // TODO need to implement
      durabilityUsed: 2,
    },
  };
  baseDamage = 20;
}

// Ranged Weapons

class Sling extends CItem {
  key = 'sling';
  name = 'Sling';
  durability = 200;
  startingDurability = 200;
  actionKeys = ['sling'];
  type = ['sling', 'weapon', 'ranged'];
  actions = {
    sling: {
      type: 'rangedAttack',
      name: 'Sling',
      actionPointDuration: 1,
      durabilityUsed: 1,
    },
  };
}

const craftItem: {
  [itemKey: string]: (attributes: { [attribute: string]: number }) => Item;
} = {
  leatherSack: (attributes) => {
    return ItemFactory.create(attributes, LeatherSack);
  },
  stoneDagger: (attributes) => {
    return ItemFactory.create(attributes, StoneDagger);
  },
  stoneAxe: (attributes) => {
    return ItemFactory.create(attributes, StoneAxe);
  },
  stonePickaxe: (attributes) => {
    return ItemFactory.create(attributes, StonePickaxe);
  },
  sling: (attributes) => {
    return ItemFactory.create(attributes, Sling);
  },
  cedarCopperAxe: (attributes) => {
    return ItemFactory.create(attributes, CedarCopperAxe);
  },
  cedarCopperPickaxe: (attributes) => {
    return ItemFactory.create(attributes, CedarCopperPickaxe);
  },
  copperSword: (attributes) => {
    return ItemFactory.create(attributes, CopperSword);
  },
  goblinSpear: (attributes) => {
    return ItemFactory.create(attributes, GoblinSpear);
  },
};

export default craftItem;
