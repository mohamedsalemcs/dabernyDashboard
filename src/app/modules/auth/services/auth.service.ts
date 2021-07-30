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
    return localStorage.getItem(this.tokenKey) ? (JSON.parse(localStorage.getItem(this.tokenKey)) as UserRegisterationResult) : null;
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
  }
  /* #endregion */

  /* #region  Methods */
  saveLogin(user: UserRegisterationResult) {
    if (user) {
      this.setToken(JSON.stringify(user));
    }
  }
  login(credentials: UserLoginVM) {
    return this.http.post(this.serviceBaseUrl + '/Login', credentials)
      .pipe(map((response: BaseResponse<UserRegisterationResult>) => {
        if (response && response.success && response.resource.isVerified && response.resource.isActive) {
          this.saveLogin(response.resource);
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

  private setToken(token: string) {
    if (token && token.trim()) {
      localStorage.setItem(this.tokenKey, token);
      if (this.authChanged) {
        this.authChanged.emit(true);
      }
    }
  }
  private removeToken() {
    localStorage.removeItem(this.tokenKey);
    // if (this.authChanged) {
    //   this.authChanged.emit(false);
    // }

  }
  /* #endregion */
}
