import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { encryptData } from '../utils/token.utils';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //IF IN FUTURE WE USE AUTHENTICATION TOKEN THEN
    // const token: string = localStorage.getItem('token');

    // if (token) {
    // request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + "abc") });
    // }

    if (request.body) {
      request = request.clone({
        body: { data: encryptData(JSON.stringify(request.body)) },
      });
      //console.log(`Request interceptor ${request.body}`);
    } else {
      //console.log(`Request interceptor Param ${request.params}`);
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('EVENT LOGGED IN REQUEST INTERCEPT--->>>', event);
        }
        return event;
      })
    );
  }
}
