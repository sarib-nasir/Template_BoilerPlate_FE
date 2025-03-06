// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard  {
//   constructor(private auth: AuthService, private router: Router) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     //console.log('auth gaurd !!');
//     if (this.auth.isAuthenticated()) {
//       return true;
//     }
//     sessionStorage.clear();
//     this.router.navigate(['auth']);
//     return false;
//   }
// }
