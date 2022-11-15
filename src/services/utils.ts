import { Notify } from 'quasar';
import { ActionLogCategory, ActionLogLevel } from 'src/models/ActionLog';
import { useSimulationStore } from 'src/stores/simulation.store';

const simulationStore = useSimulationStore();

export default class Utils {
  static wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static toTwoDecimal(number: number) {
    return Math.trunc(number * 100) / 100;
  }

  // TODO add a settings flag so on runFullSimulation (auto runs) it produces report instead of onscreen notificactions

  static info(message: string, category: ActionLogCategory) {
    simulationStore.addLog(message, category, ActionLogLevel.info, new Date());
    Notify.create({
      message: message,
      icon: 'check_circle',
      // position: 'top-right',
      classes: 'simulator-q-notify-info',
    });
  }

  static warning(message: string, category: ActionLogCategory) {
    simulationStore.addLog(
      message,
      category,
      ActionLogLevel.warning,
      new Date()
    );
    Notify.create({
      message: message,
      icon: 'check_circle',
      // position: 'top-right',
      classes: 'simulator-q-notify-warning',
    });
  }

  static error(message: string, category: ActionLogCategory) {
    simulationStore.addLog(message, category, ActionLogLevel.error, new Date());
    Notify.create({
      message: message,
      icon: 'error',
      // position: 'top-right',
      classes: 'simulator-q-notify-error',
    });
  }

  static camelCaseToTitleCase(text: string | null): string {
    if (text) {
      const result = text.replace(/([A-Z])/g, ' $1');
      return result.charAt(0).toUpperCase() + result.slice(1);
    } else {
      return '';
    }
  }
}
