export interface Item {
  id: number;
  key: string;
  name: string;
  durability: number;
  startingDurability: number;
  actionKeys: string[];
  type: string[];
  actions: { [actionKey: string]: Action };
  attributes?: { [attribute: string]: number };
  baseDamage?: number;
}
