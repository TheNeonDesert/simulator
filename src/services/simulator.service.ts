import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';
import {
  SimulationStore,
  useSimulationStore,
} from 'src/stores/simulation.store';

class Simulator {
  private settingsStore: SettingsStore;
  private settings: SettingsStore;
  private simulationStore: SimulationStore;

  constructor() {
    this.settingsStore = useSettingsStore();
    this.simulationStore = useSimulationStore();
    this.settings = {} as SettingsStore;

    // init
    this.simulationStore.results = '';

    // set defaults
    this.settingsStore.actionsPerMinute = 1;
    this.settingsStore.minutesPerEnounter = 60 * 24;
    this.settingsStore.numberEncounters = 10;
    this.settingsStore.startingCedar = 1000;
    this.settingsStore.startingCedarCopperAxes = 90;

    // in theory, if the ratio between these two is consistent then growth curve will stay flat
    this.settingsStore.woodProducedPerAction = 10;
    this.settingsStore.costOfWoodToCraftAxe = 100;

    this.settingsStore.durabilityUsedPerAction = 5;
    this.settingsStore.durabilityPtsPerAxe = 50;
  }

  // main entry point to run simulation
  run() {
    // snapshot of settingsStore so we don't change model values
    for (const key in this.settingsStore) {
      if (this.settingsStore[key]) {
        this.settings[key] = this.settingsStore[key];
      }
    }

    this.simulationStore.newline('starting simulation');
    this.simulationStore.newline();

    // move logic to behave in loops like
    // craft items
    // craft pickaxe and axe
    // gather resources
    // gather ore and wood
    // forage first...
    this.chopCedar();

    // TODO actually require and account for metal
    // TODO start off foraging...
    // TODO add in bonuses you get from leveling up (1% of current lvl?)
    // TODO simulate recompiles...

    this.cleanUp();
  }

  cleanUp() {
    this.settings = {} as SettingsStore;
  }

  // chop cedar until some conditions...
  chopCedar() {
    this.simulationStore.newline('chop cedar');
    this.simulationStore.newline();

    for (let i = 0; i < this.settings.numberEncounters; i++) {
      this.simulationStore.newline(
        `expedition ${i}: ${this.settings.startingCedar} wood ${this.settings.startingCedarCopperAxes} axes`
      );
      this.simulationStore.newline();

      // craft as many axes as we can
      let crafted = 0;
      while (
        this.settings.startingCedar >= this.settings.costOfWoodToCraftAxe
      ) {
        this.settings.startingCedar -= this.settings.costOfWoodToCraftAxe;
        this.settings.startingCedarCopperAxes++;
        crafted++;
      }

      if (this.settings.startingCedarCopperAxes < 1) {
        this.simulationStore.newline("out of axes and can't craft more");
        break;
      }
      this.settings.startingCedarCopperAxes--; // use first axe
      let durabilityOnCurrentAxe = this.settings.durabilityPtsPerAxe; // init first axe
      let j;
      let gainedWood = 0;
      // main action loop
      for (
        j = 0;
        j < this.settings.actionsPerMinute * this.settings.minutesPerEnounter;
        j++
      ) {
        if (durabilityOnCurrentAxe >= this.settings.durabilityUsedPerAction) {
          durabilityOnCurrentAxe -= this.settings.durabilityUsedPerAction; // use durability from current axe
        } else if (this.settings.startingCedarCopperAxes > 0) {
          this.settings.startingCedarCopperAxes--; // not enough durability on current axe, use next
          durabilityOnCurrentAxe =
            this.settings.durabilityPtsPerAxe -
            (this.settings.durabilityUsedPerAction - durabilityOnCurrentAxe);
        } else {
          break; // out of axes, need to craft more
        }

        this.settings.startingCedar += this.settings.woodProducedPerAction; // gain your wood
        gainedWood += this.settings.woodProducedPerAction;
      }
      this.simulationStore.newline(`crafted ${crafted} axes`);
      this.simulationStore.newline(`performed ${j} actions`);
      this.simulationStore.newline(`gained ${gainedWood} wood`);
    }
  }
}

export default new Simulator();
