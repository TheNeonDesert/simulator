import { defineStore } from 'pinia';

export const useSimulationStore = defineStore('simulation', {
  state: () => ({
    results: '',
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
  results: string;
}
