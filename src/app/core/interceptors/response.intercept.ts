import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { decryptData } from '../utils/token.utils';
import { Router } from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor( private router: Router ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //console.log(event.body);

          var data;
          if (event.body.data) {
            data = this.parseObject(event.body.data);
          } else if (event.body) {
            data = this.parseObject(event.body);
          } else {
            data = this.parseObject(event);
          }

          event = event.clone({
            body: data,
          });
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirect to /auth/login on unauthorized response
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }

  private parseObject = (data: any): any => {
    const jsonString = decryptData(data);
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return jsonString;
    }
  };
}
