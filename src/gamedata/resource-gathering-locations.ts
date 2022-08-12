import { ResourceGatheringLocation } from 'src/models/ResourceGatheringLocation';

// TODO add a `explanation` param and maybe a graphic, ex...
// Forage at the wilderness to gain sticks, stones, apples and plant fibers.
// You don't need any special tools but you might want to craft a dagger to fend off any wolves you cross!

class Wilderness implements ResourceGatheringLocation {
  name = 'Wilderness';
  activityName = 'Forage';
  rewards = [
    { resourceKey: 'stone', quantityStoreKey: 'stoneGainedPerAction' },
    { resourceKey: 'stick', quantityStoreKey: 'stickGainedPerAction' },
    {
      resourceKey: 'plantFiber',
      quantityStoreKey: 'plantFiberGainedPerAction',
    },
    { resourceKey: 'apple', quantityStoreKey: 'appleGainedPerAction' },
  ];
  randomEncounters = [
    {
      name: 'Wolf Attack',
      encounterChanceKey: 'chanceWolfAttackPerAction',
    },
  ];
}

class CedarForest implements ResourceGatheringLocation {
  name = 'Cedar Forest';
  activityName = 'Chop';
  rewards = [
    { resourceKey: 'cedarLog', quantityStoreKey: 'cedarLogGainedPerAction' },
  ];
  randomResourceRewards = [
    { resourceKey: 'pineTar', rewardChanceKey: 'chanceFindPineTarPerAction' },
  ];
  randomEncounters = [
    {
      name: 'Eagle Attack',
      encounterChanceKey: 'chanceEagleAttackPerAction',
    },
  ];
}

class CopperMine implements ResourceGatheringLocation {
  name = 'Copper Mine';
  activityName = 'Dig';
  rewards = [
    { resourceKey: 'copperOre', quantityStoreKey: 'copperOreGainedPerAction' },
  ];
  randomResourceRewards = [
    { resourceKey: 'ruby', rewardChanceKey: 'chanceFindRubyPerAction' },
  ];
  randomEncounters = [
    {
      name: 'Kobold Attack',
      encounterChanceKey: 'chanceKoboldAttackPerAction',
    },
  ];
}

const resourceGatheringLocations: {
  [locationKey: string]: ResourceGatheringLocation;
} = {
  wilderness: new Wilderness(),
  cedarForest: new CedarForest(),
  copperMine: new CopperMine(),
};

export default resourceGatheringLocations;
