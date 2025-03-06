import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareObjectsService } from './nav-bar-service.service';
@Injectable({
  providedIn: 'root',
})
export class LoaderServiceService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Contains in-progress loading requests
   */
  loadingMap: Map<string, boolean> = new Map<string, boolean>();
  public href: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _ShareObjectsService: ShareObjectsService
  ) {}

  /**
   * Sets the loadingSub property value based on the following:
   * - If loading is true, add the provided url to the loadingMap with a true value, set loadingSub value to true
   * - If loading is false, remove the loadingMap entry and only when the map is empty will we set loadingSub to false
   * This pattern ensures if there are multiple requests awaiting completion, we don't set loading to false before
   * other requests have completed. At the moment, this function is only called from the @link{HttpRequestInterceptor}
   * @param loading {boolean}
   * @param url {string}
   */
  setLoading(loading: boolean, url: string): void {
    this.href = this.router.url;

    if (!url) {
      throw new Error(
        'The request URL must be provided to the LoadingService.setLoading function'
      );
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    } else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }

    this._ShareObjectsService.nextCount(this.href);
  }

  decryptDetailParam = (msg): string => {
    var decryptedMessage = CryptoJS.AES.decrypt(
      msg,
      environment.appKEY1
    ).toString(CryptoJS.enc.Utf8);
    if (
      decryptedMessage == null ||
      decryptedMessage == ''
    ) {
      this.router.navigate(['/no-data-found']);
    }

    return decryptedMessage;
  };
}
