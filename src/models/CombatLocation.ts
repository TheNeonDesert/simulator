export interface CombatLocation {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enemies: {
    order: number;
    enemyKey: string;
    quantity: number;
    generateReward: () => CombatReward;
  }[];

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

export interface CombatReward {
  resourceKey?: string;
  resourceQuantity?: number;
  craftableItemKey?: string;
}
