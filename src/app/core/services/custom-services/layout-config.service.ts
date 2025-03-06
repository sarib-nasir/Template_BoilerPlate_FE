import { Injectable } from '@angular/core';
import { Router, ResolveEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LayoutConfig } from '../../interfaces/layout-config';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class LayoutConfigService {
  defaultConfig: LayoutConfig = {
    header: true,
    footer: true,
    sidebar: true,
    default: true,
  };

  private _configSubject: BehaviorSubject<LayoutConfig>;

  constructor(private _router: Router) {
    this._init();
  }

  /**
   * Set and get the config
   */
  set config(value) {
    // Get the value from the behavior subject
    let config = this._configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // Notify the observers
    this._configSubject.next(config);
  }

  get config(): any | Observable<LayoutConfig> {
    return this._configSubject.asObservable();
  }

  private _init(): void {
    // Set the config from the default config
    this._configSubject = new BehaviorSubject(_.cloneDeep(this.defaultConfig));

    // Reload the default layout config on every RoutesRecognized event
    // if the current layout config is different from the default one
    this._router.events
      .pipe(filter((event) => event instanceof ResolveEnd))
      .subscribe(() => {
        if (
          !_.isEqual(
            this._configSubject.getValue().default,
            this.defaultConfig.default
          )
        ) {
          // Clone the current config
          // const config = _.cloneDeep(this._configSubject.getValue());

          // // Reset the layout from the default config
          // config.layout = _.cloneDeep(this.defaultConfig.layout);

          const config = _.cloneDeep(this.defaultConfig);
          // Set the config
          this._configSubject.next(config);
        }
      });
  }

  setConfig(value, opts = { emitEvent: true }): void {
    // Get the value from the behavior subject
    let config = this._configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // If emitEvent option is true...
    if (opts.emitEvent === true) {
      // Notify the observers
      this._configSubject.next(config);
    }
  }

  /**
   * Get config
   *
   * @returns {Observable<any>}
   */
  getConfig(): Observable<any> {
    return this._configSubject.asObservable();
  }

  /**
   * Reset to the default config
   */
  resetToDefaults(): void {
    // Set the config from the default config
    this._configSubject.next(_.cloneDeep(this.defaultConfig));
  }

  load(data: LayoutConfig): void {
    this._configSubject.next(data);
  }
}
