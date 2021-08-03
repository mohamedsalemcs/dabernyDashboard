import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@core/base-component/base-component';
import { LanguageService } from '@core/services/language-service/language.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '@core/services/alert-service/alert.service';
import { HeaderService } from '@core/services/header-service/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  user: any;
  isLoading: boolean;
  isSubmitted: boolean;

  /* #region  Prroperties & Fields */

  /* #endregion */

  /* #region  Parameters */

  /* #endregion */

  /* #region  Constructor */
  constructor(
    translate: TranslateService,
    languageService: LanguageService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private headerService: HeaderService,
  ) {
    super(translate, languageService);
  }
  /* #endregion */

  /* #region  Events */
  ngOnInit() {
    this.headerService.changeTile('Login');
    this.initForm();
  }
  /* #endregion */

  /* #region  Methods */
  resetForm() {
    this.user = null;
    this.isSubmitted = false;
    this.isLoading = false;
    this.form.reset();
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [true]
    });
  }
  login() {
    this.isSubmitted = true;


    if (this.form.valid) {
      //const loader = await this.loaderService.showLoader();
      this.isLoading = true;
      const loginVm = this.form.getRawValue();
      this.authService.login(loginVm).subscribe((response) => {
        //loader.dismiss();
        this.resetForm();
        this.isLoading = false;

        if (response) {
          if (response.success) {
            this.resetForm();
            this.router.navigate([this.AppUrls.home]);
          } else {
            this.alertService.errorMsg(response.message || 'errors.loginFailed');
          }
        } else {
          this.alertService.errorMsg('errors.loginFailed');
        }
      }, (error) => {
        //loader.dismiss();
        this.isLoading = false;
        this.alertService.error(error);
      });
    }
  }

  /* #endregion */
}
