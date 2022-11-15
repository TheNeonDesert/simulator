import { defineStore } from 'pinia';
import {
  ActionLog,
  ActionLogCategory,
  ActionLogLevel,
} from 'src/models/ActionLog';
import _ from 'underscore';

export const useSimulationStore = defineStore('simulation', {
  state: () => ({
    // misc site settings
    showTooltips: true,
    autoHealAvatar: true,
    autoRepairItems: true,

    results: '',
    totalActions: 0,

    actionLogs: [] as ActionLog[],
  }),
  getters: {
    getLogs: (state) => {
      return _.sortBy(state.actionLogs, 'timestamp').reverse();
    },
  },
  actions: {
    newline(line?: string) {
      if (line) {
        this.results += line + '<br />';
      } else {
        this.results += '<br />';
      }
    },
    addLog(
      message: string,
      category: ActionLogCategory,
      level: ActionLogLevel,
      timestamp: Date
    ) {
      this.actionLogs.push({
        message: message,
        category: category,
        level: level,
        timestamp: timestamp,
      });
    },
  },
});

export interface SimulationStore {
  newline: (line?: string) => void;
  getLogs: ActionLog[];

  showTooltips: boolean;
  autoHealAvatar: boolean;
  autoRepairItems: boolean;
  results: string;
  totalActions: number;
  actionLogs: ActionLog[];
}
