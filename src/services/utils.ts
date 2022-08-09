import { Notify } from 'quasar';

export default class Utils {
  static wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static toTwoDecimal(number: number) {
    return Math.trunc(number * 100) / 100;
  }

  // TODO add a settings flag so on runFullSimulation (auto runs) it produces report instead of onscreen notificactions
  static notify(text: string) {
    Notify.create({
      message: text,
      icon: 'check_circle',
      position: 'top-right',
      classes: 'simulator-q-notify',
    });
  }

  static error(text: string) {
    Notify.create({
      message: text,
      icon: 'error',
      classes: 'simulator-q-notify-error',
    });
  }
}