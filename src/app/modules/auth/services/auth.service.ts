/* #region  Imports */

import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppUrls } from '../../core/helpers/app-urls';
import { map } from 'rxjs/operators';
import { UserRegisterationVM } from '../models/UserRegisterationVM';
import { BaseResponse } from '../../core/models/BaseResponse';
import { UserRegisterationResult } from '../models/UserRegisterationResult';
import { BaseService } from '../../core/services/base-service/base-service';
import { UserLoginVM } from '../models/UserLoginVM';
import { ChangePasswordVm } from '../models/change-password-vm';
import { Reflection } from '@core/helpers/reflection';

/* #endregion */

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  /* #region  Fields & Properties */
  private tokenKey: string = environment.tokenKey;
  private jwtHelper = new JwtHelperService();
  @Output() authChanged: EventEmitter<boolean> = new EventEmitter();

  get UserFromToken() {
    return sessionStorage.getItem(this.tokenKey) ? (JSON.parse(sessionStorage.getItem(this.tokenKey)) as UserRegisterationResult) : null;
  }

  get currentUser() {
    let user: UserRegisterationResult = this.UserFromToken;
    if (user) {
      user.decodedToken = (this.UserFromToken && this.UserFromToken.token) ? (this.jwtHelper.decodeToken(this.getToken())) : null;
    } else {
      user = null;
      this.removeToken();
    }
    return user;
  }
  /* #endregion */

  /* #region  Constructor */
  constructor(
    http: HttpClient,
    private router: Router
  ) {
    super(http, `${environment.apiUrl}/Auth`);

    this.setSessionAtStartUp();

    if (window.addEventListener) {
      window.addEventListener(
        'storage',
        (event: StorageEvent) => this.sessionStorageTransfer(event),
        false
      );
    }
    if (
      !localStorage.getItem(this.tokenKey) &&
      !sessionStorage.getItem(this.tokenKey)
    ) {
      localStorage.setItem('getSessionStorage', this.tokenKey);
      localStorage.removeItem('getSessionStorage');
    }
  }
  /* #endregion */

  /* #region  Methods */
  sessionStorageTransfer(event: StorageEvent) {
    if (!event.newValue) {
      return;
    }
    // do nothing if no value to work with
    if (event.key === 'logoutNow') {
      this.removeToken();
      this.goToLogin();
    }
    if (event.key === 'getSessionStorage') {
      const obj = {};
      obj[event.newValue] = sessionStorage.getItem(event.newValue);
      // another tab asked for the sessionStorage -> send it
      localStorage.setItem('sessionStorage', JSON.stringify(obj));
      // the other tab should now have it, so we're done with it.
      localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
    } else if (event.key === 'sessionStorage') {
      // another tab sent data <- get it
      const data = Reflection.ObjectToKeyValueArray(JSON.parse(event.newValue));

      if (data && data.length) {
        if (data[0].key && data[0].value) {
          sessionStorage.setItem(data[0].key, data[0].value);
          if (data[0].key === this.tokenKey) {
            window.location.reload();
          }
        }
      }
    }
  }
  goToLogin() {
    this.router.navigate([AppUrls.auth.login]);
  }
  private setSessionAtStartUp() {
    this.setToken(localStorage.getItem(this.tokenKey), false);
  }

  saveLogin(user: UserRegisterationResult, rememberMe: boolean) {
    if (user) {
      this.setToken(JSON.stringify(user), rememberMe);
    }
  }
  login(credentials: UserLoginVM) {
    return this.http.post(this.serviceBaseUrl + '/Login', credentials)
      .pipe(map((response: BaseResponse<UserRegisterationResult>) => {
        if (response && response.success && response.resource.isVerified && response.resource.isActive) {
          this.saveLogin(response.resource, credentials.rememberMe);
          return response;
        }
        return response;
      }));
  }

  register(model: UserRegisterationVM) {
    return this.http.post<BaseResponse<UserRegisterationResult>>(this.serviceBaseUrl + '/Register', model);
  }
  changePassword(model: ChangePasswordVm) {
    return this.http.put<BaseResponse<boolean>>(this.serviceBaseUrl + '/ChangePasswordAsync', model);
  }
  resendVarifedMail(email: string) {
    return this.http.get<BaseResponse<boolean>>(`${this.serviceBaseUrl}/ResendVarifedMail?email=${email}`);
  }
  authLogout() {
    return this.http.get<BaseResponse<boolean>>(`${this.serviceBaseUrl}/Logout`);
  }

  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    this.clearAllOnLogout();
  }
  setLoginProvider(provider) {
    localStorage.setItem(environment.loginProviderKey, provider);
  }
  private clearAllOnLogout() {
    this.removeToken();
    localStorage.removeItem(environment.loginProviderKey);
    this.authChanged.emit(this.isAuthenticated());
    this.router.navigateByUrl(AppUrls.auth.login, { replaceUrl: true });
    // this.router.navigate([AppUrls.auth.landing], { replaceUrl: true });
  }

  public isAuthenticated(): boolean {

    let isAuth = false;
    try {
      const token = this.getToken();
      isAuth = token ? !this.jwtHelper.isTokenExpired(token) : false;
    } catch (error) {
      isAuth = false;
    } finally {
      if (!isAuth) {
        this.removeToken();
      }
      return isAuth;
    }
  }

  public getToken() {
    if (this.UserFromToken) {
      return this.UserFromToken.token;
    } else {
      return null;
    }
  }


  setToken(token: string, rememberMe: boolean) {
    if (token && token.trim()) {
      if (rememberMe === true) {
        localStorage.setItem(this.tokenKey, token);
      }
      sessionStorage.setItem(this.tokenKey, token);

      if (this.authChanged) {
        this.authChanged.emit(true);
      }
    }
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
  }
  /* #endregion */
}
