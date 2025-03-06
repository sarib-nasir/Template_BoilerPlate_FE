import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/public/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: 'Home',
    component: LandingPageComponent
    // loadChildren: () =>
    //   import('./components/auth/auth.module').then((x) => x.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [];
