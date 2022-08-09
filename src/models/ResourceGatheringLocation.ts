export interface ResourceGatheringLocation {
  name: string;
  activityName: string;
  rewards: { resourceKey: string; quantityStoreKey: string }[];
  randomResourceRewards?: {
    resourceKey: string;
    rewardChanceKey: string;
  }[];
  randomEncounters?: {
    name: string;
    encounterChanceKey: string;
  }[];
}
