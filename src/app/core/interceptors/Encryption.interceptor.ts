import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { decryptData, encryptData } from '../utils/token.utils';

@Injectable()
export class EncryptionInterceptor implements HttpInterceptor {
    constructor(private _router: Router) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                // this.alertService.clear();

                if (err.status === 200) {
                    return of(
                        new HttpResponse({
                            status: 200,
                            body: JSON.parse(decryptData(err.error.text)),
                        })
                    );
                }

                if (err.status === 401) {
                    //this.authenticationService.logout();
                    //location.reload(true);
                }

                const error = err.error.message || err.statusText;
                //this.alertService.error(error);
            })
        );
    }
}
