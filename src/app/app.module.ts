import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { SESSION_STORAGE_KEYS } from './core/constants/local-storage-keys copy';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader-interceptor.service';
import { RequestInterceptor } from './core/interceptors/request.intercept';
import { ResponseInterceptor } from './core/interceptors/response.intercept';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { decryptDetailParam } from './core/utils/token.utils';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
registerLocaleData(en);

// export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
export function tokenGetter() {
  return decryptDetailParam(sessionStorage.getItem(SESSION_STORAGE_KEYS.Token));
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NzEmptyModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzCheckboxModule,
    NzSelectModule,
    NzNotificationModule,
    NzDrawerModule,
    NzModalModule,
    // NgxMaskModule.forRoot(options),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.apiBaseURL],
      },
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideNgxMask({
      validation: true,
    }),
    // { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
