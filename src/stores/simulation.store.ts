import { defineStore } from 'pinia';

export const useSimulationStore = defineStore('simulation', {
  state: () => ({
    // misc site settings
    showTooltips: true,

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
  showTooltips: boolean;
  newline: (line?: string) => void;
  results: string;
  totalActions: number;
}
