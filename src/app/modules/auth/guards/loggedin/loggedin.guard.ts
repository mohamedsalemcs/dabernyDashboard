import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUrls } from 'src/app/modules/core/helpers/app-urls';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {
  /* #region  Constructor */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  /* #endregion */

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.currentUser) {
      if (!state.url.toLowerCase().includes(AppUrls.auth.login)) {
        this.authService.logout();
      }
      return true;
    } else {
      this.router.navigate([AppUrls.home]);
      return false;
    }
  }

}
