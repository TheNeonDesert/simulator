// import _ from 'underscore';

class AnalyticsService {
  private agent;
  private application;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private api = {} as any; // TODO Obvs just a placeholder...

  constructor() {
    this.agent = navigator.userAgent;
    this.application = 'simulator';

    // TODO setup axios and just make the call right from this file
  }

  log(type: string, name: string, data: { [key: string]: string }) {
    const now = new Date();
    this.api.post(type, {
      application: this.application,
      name: name,
      data: data,
      agent: this.agent,
      browserLocalDate: now.toLocaleString(),
      utcDate: now.toISOString(),
    });
  }

  page(name: string, data: { [key: string]: string }) {
    this.log('page', name, data);
  }

  event(name: string, data: { [key: string]: string }) {
    this.log('event', name, data);
  }
}

export default new AnalyticsService();
