export interface ActionLog {
  message: string;
  category: ActionLogCategory;
  level: ActionLogLevel;
  timestamp: Date;
}

export enum ActionLogCategory {
  combat = 'combat',
  actions = 'actions',
  world = 'world',
}

export enum ActionLogLevel {
  info = 'info',
  warning = 'warning',
  error = 'error',
}
