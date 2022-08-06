export interface ResourceGatheringLocation {
  name: string;
  activityName: string;
  rewards: { resourceKey: string; quantityStoreKey: string }[];
  randomEncounters: {
    name: string;
    encounterChanceKey: string;
  }[];
}
