export interface CombatLocation {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enemies: { order: number; enemyKey: string; quantity: number }[];
  // activityName: string;
  // rewards: { resourceKey: string; quantityStoreKey: string }[];
  // randomResourceRewards?: {
  //   resourceKey: string;
  //   rewardChanceKey: string;
  // }[];
  // randomEncounters?: {
  //   name: string;
  //   encounterChanceKey: string;
  // }[];
}
