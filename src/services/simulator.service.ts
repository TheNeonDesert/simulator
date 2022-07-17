import { SettingsStore, useSettingsStore } from 'src/stores/settings.store';

class Simulator {
  private settingsStore: SettingsStore;

  constructor() {
    this.settingsStore = useSettingsStore();

    // set defaults
    this.settingsStore.actionsPerMinute = 1;
    this.settingsStore.woodProducedPerAction = 10;
    this.settingsStore.durabilityUsedPerAction = 5;
    this.settingsStore.minutesPerEnounter = 60 * 24;
    this.settingsStore.numberEncounters = 10;
    this.settingsStore.costOfWoodToCraftAxe = 100;
    this.settingsStore.durabilityPtsPerAxe = 50;
    this.settingsStore.woodInBackpack = 1000;
    this.settingsStore.axesInBackpack = 90;
  }

  // main entry points
  run() {
    this.chopCedar();
  }

  // chop cedar until some conditions...
  chopCedar() {
    console.log('chop cedar');

    if (this.settingsStore) {
      for (let i = 0; i < this.settingsStore.numberEncounters; i++) {
        console.log(
          `\nexpedition ${i}: ${this.settingsStore.woodInBackpack} wood ${this.settingsStore.axesInBackpack} axes\n`
        );

        // craft as many axes as we can
        let crafted = 0;
        while (
          this.settingsStore.woodInBackpack >=
          this.settingsStore.costOfWoodToCraftAxe
        ) {
          this.settingsStore.woodInBackpack -=
            this.settingsStore.costOfWoodToCraftAxe;
          this.settingsStore.axesInBackpack++;
          crafted++;
        }

        if (this.settingsStore.axesInBackpack < 1) {
          console.log("out of axes and can't craft more");
          break;
        }
        this.settingsStore.axesInBackpack--; // use first axe
        let durabilityOnCurrentAxe = this.settingsStore.durabilityPtsPerAxe; // init first axe
        let j;
        let gainedWood = 0;
        // main action loop
        for (
          j = 0;
          j <
          this.settingsStore.actionsPerMinute *
            this.settingsStore.minutesPerEnounter;
          j++
        ) {
          if (
            durabilityOnCurrentAxe >= this.settingsStore.durabilityUsedPerAction
          ) {
            durabilityOnCurrentAxe -=
              this.settingsStore.durabilityUsedPerAction; // use durability from current axe
          } else if (this.settingsStore.axesInBackpack > 0) {
            this.settingsStore.axesInBackpack--; // not enough durability on current axe, use next
            durabilityOnCurrentAxe =
              this.settingsStore.durabilityPtsPerAxe -
              (this.settingsStore.durabilityUsedPerAction -
                durabilityOnCurrentAxe);
          } else {
            break; // out of axes, need to craft more
          }

          this.settingsStore.woodInBackpack +=
            this.settingsStore.woodProducedPerAction; // gain your wood
          gainedWood += this.settingsStore.woodProducedPerAction;
        }
        console.log(`crafted \t${crafted} axes`);
        console.log(`performed \t${j} actions`);
        console.log(`gained \t\t${gainedWood} wood`);
      }
    }
  }
}

export default new Simulator();
