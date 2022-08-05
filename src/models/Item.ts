export interface Item {
  name: string;
  durability: number;
  startingDurability: number;
  actionKeys: string[];
  type: string[];
  actions: { [actionKey: string]: Action };
  baseDamage?: number;
}
