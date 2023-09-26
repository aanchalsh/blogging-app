// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';
// import { BlogService } from './blog.service';

// @Injectable({
//   providedIn: 'root'
// })

// export class AuthGuard implements CanActivate {
  
//   constructor(private blogService: BlogService, private router: Router) { }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     const requiresAuth = route.data && route.data['requiresAuth'] === true;

//     if (requiresAuth && !this.blogService.isAuthenticated()) {
//       this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//       return false;
//     } else {
//       return true;
//     }
//   }
// }  
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // User is authenticated
      return true;
    } else {
      // User is not authenticated; redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}

