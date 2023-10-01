import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
    // Listen for route changes to determine whether to show header and footer
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Call the function to check whether to exclude the header and footer
        this.isRouteExcluded();
      }
    });
  }

  isRouteExcluded(): boolean {
    const currentRoute = this.router.url;
    if (currentRoute) {
      const excludedRoutes = ['admin-login', 'admin-function'];
      const parts = currentRoute.split('/');
      const lastPart = parts[parts.length - 1];
      return excludedRoutes.includes(lastPart);
    }
    return false;
  }
}

