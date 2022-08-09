import { Item } from 'src/models/Item';

interface ItemFactory {
  create(attributes: { [attribute: string]: number }): Item;
}

// Utilities

class LeatherSack implements Item {
  key = 'leatherSack';
  name = 'Leather Sack';
  durability = 1;
  startingDurability = 1;
  actionKeys = [];
  type = ['bag'];
  actions = {};
  attributes;

  constructor(additionalCarryingCapacity: number) {
    this.attributes = {
      additionalCarryingCapacity: additionalCarryingCapacity,
    };
  }
}
class LeatherSackFactory implements ItemFactory {
  create(attributes: { [attribute: string]: number }) {
    return new LeatherSack(attributes.additionalCarryingCapacity);
  }
}

// Axes

class StoneAxe implements Item {
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
class StoneAxeFactory implements ItemFactory {
  create() {
    return new StoneAxe();
  }
}

class CedarCopperAxe implements Item {
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
class CedarCopperAxeFactory implements ItemFactory {
  create() {
    return new CedarCopperAxe();
  }
}

// Pickaxes

class StonePickaxe implements Item {
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
class StonePickaxeFactory implements ItemFactory {
  create() {
    return new StonePickaxe();
  }
}

class CedarCopperPickaxe implements Item {
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
class CedarCopperPickaxeFactory implements ItemFactory {
  create() {
    return new CedarCopperPickaxe();
  }
}

// Melee Weapons

class StoneDagger implements Item {
  key = 'stoneDagger';
  name = 'Stone Dagger';
  durability = 1;
  startingDurability = 1;
  actionKeys = ['stab'];
  type = ['dagger', 'weapon'];
  actions = {
    stab: {
      type: 'meleeAttack',
      name: 'Chop',
      actionPointDuration: 1,
      durabilityUsed: 1,
    },
  };
}
class StoneDaggerFactory implements ItemFactory {
  create() {
    return new StoneDagger();
  }
}

class CopperSword implements Item {
  key = 'copperSword';
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
class CopperSwordFactory implements ItemFactory {
  create() {
    return new CopperSword();
  }
}

const craftableItems: { [itemKey: string]: ItemFactory } = {
  leatherSack: new LeatherSackFactory(),
  stoneDagger: new StoneDaggerFactory(),
  stoneAxe: new StoneAxeFactory(),
  stonePickaxe: new StonePickaxeFactory(),
  cedarCopperAxe: new CedarCopperAxeFactory(),
  cedarCopperPickaxe: new CedarCopperPickaxeFactory(),
  copperSword: new CopperSwordFactory(),
};

export default craftableItems;
