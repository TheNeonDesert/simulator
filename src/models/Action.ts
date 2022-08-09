interface Action {
  type: string;
  skill?: string;
  name: string;
  actionPointDuration: number; // TODO actually implement... we don't use this anywhere, I just you just multiply a bit no biggy
  durabilityUsed: number;
}

const action: Action = {
  type: 'string',
  skill: 'string',
  name: 'string',
  actionPointDuration: 0,
  durabilityUsed: 0,
};
action;
