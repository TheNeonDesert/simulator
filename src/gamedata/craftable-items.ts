import { Item } from 'src/models/Item';

let itemIdIndex = 0;

abstract class ItemFactory {
  // itemIdIndex = 0;
  // id;
  // attributes;

  // constructor(id: number, attributes: { [attribute: string]: number }) {
  //   this.id = id;
  //   this.attributes = attributes;
  // }
  abstract create(attributes: { [attribute: string]: number }): Item;
}

// TODO maybe maybe... create a master ItemFactory which adds all the settings
//  resources costs info etc from a json object and generates all the file additions we need?

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

  // constructor(id: number, attributes: { [attribute: string]: number }) {
  //   this.id = id;
  //   this.attributes = attributes;
  // }
}
class LeatherSackFactory extends ItemFactory {
  create(attributes: { [attribute: string]: number }) {
    return new LeatherSack(itemIdIndex++, attributes);
  }
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
class StoneAxeFactory extends ItemFactory {
  create(attributes: { [attribute: string]: number }) {
    return new StoneAxe(itemIdIndex++, attributes);
  }
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
}
class CedarCopperAxeFactory extends ItemFactory {
  create(attributes: { [attribute: string]: number }) {
    return new CedarCopperAxe(itemIdIndex++, attributes);
  }
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
class StonePickaxeFactory extends ItemFactory {
  create(attributes: { [attribute: string]: number }) {
    return new StonePickaxe(itemIdIndex++, attributes);
  }
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
}
class CedarCopperPickaxeFactory extends ItemFactory {
  create(attributes: { [attribute: string]: number }) {
    return new CedarCopperPickaxe(itemIdIndex++, attributes);
  }
}

// Melee Weapons

class StoneDagger extends CItem {
  key = 'stoneDagger';
  name = 'Stone Dagger';
  durability = 1;
  startingDurability = 1;
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
class StoneDaggerFactory extends ItemFactory {
  create(attributes: { [attribute: string]: number }) {
    return new StoneDagger(itemIdIndex++, attributes);
  }
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
      actionPointDuration: 2,
      durabilityUsed: 2,
    },
  };
  baseDamage = 8;
}
class CopperSwordFactory extends ItemFactory {
  create(attributes: { [attribute: string]: number }) {
    return new CopperSword(itemIdIndex++, attributes);
  }
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
class SlingFactory extends ItemFactory {
  create(attributes: { [attribute: string]: number }) {
    return new Sling(itemIdIndex++, attributes);
  }
}

const craftableItems: { [itemKey: string]: ItemFactory } = {
  leatherSack: new LeatherSackFactory(),
  stoneDagger: new StoneDaggerFactory(),
  stoneAxe: new StoneAxeFactory(),
  stonePickaxe: new StonePickaxeFactory(),
  sling: new SlingFactory(),
  cedarCopperAxe: new CedarCopperAxeFactory(),
  cedarCopperPickaxe: new CedarCopperPickaxeFactory(),
  copperSword: new CopperSwordFactory(),
};

export default craftableItems;
