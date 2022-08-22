import { defineStore } from 'pinia';

export const useSimulationStore = defineStore('simulation', {
  state: () => ({
    // misc site settings
    showTooltips: true,
    autoHealAvatar: true,
    autoRepairItems: true,

    results: '',
    totalActions: 0,
  }),
  actions: {
    newline(line?: string) {
      if (line) {
        this.results += line + '<br />';
      } else {
        this.results += '<br />';
      }
    },
  },
});

export interface SimulationStore {
  newline: (line?: string) => void;

  showTooltips: boolean;
  autoHealAvatar: boolean;
  autoRepairItems: boolean;
  results: string;
  totalActions: number;
}
