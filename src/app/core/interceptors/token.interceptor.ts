import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {   SESSION_STORAGE_KEYS } from '../constants/local-storage-keys copy';
import { decryptDetailParam } from '../utils/token.utils';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _router: Router,
    private _notificationService: NzNotificationService,) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //const token = String(localStorage.getItem(LOCAL_STORAGE_KEYS.Token));
    const token = String(decryptDetailParam(sessionStorage.getItem(SESSION_STORAGE_KEYS.Token)));
    if (!!token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(request).pipe(
        tap(
          () => {},
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if(err.status == 401){
                sessionStorage.clear();
                this._router.navigate(['/auth']);
              }
              else if(err.status == 405){
                this._notificationService.error('Api Restriction', "This Action is not allowed. Kindly contact with your Administrator");
              }
              
            }
          }
        )
      );
    } else {
      return next.handle(request);
    }
  }

  getIsTokenExpired(token: string): boolean {
    let user = JSON.parse(atob(token.split('.')[1]));

    let expiry = user.exp;
    let now = Math.floor(Date.now() / 1000);
    return expiry <= now;
  }
}
