import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base-component/base-component';
import { AlertService } from '@core/services/alert-service/alert.service';
import { LanguageService } from '@core/services/language-service/language.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserProfile } from 'src/app/modules/profile/models/UserProfileVM';
import { UserProfileService } from 'src/app/modules/profile/services/user-profile/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  userProfile: UserProfile;

  /* #region  Prroperties & Fields */

  /* #endregion */

  /* #region  Parameters */

  /* #endregion */

  /* #region  Constructor */
  constructor(
    translate: TranslateService,
    languageService: LanguageService,
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private alertService: AlertService
  ) {
    super(translate, languageService);
  }
  /* #endregion */

  /* #region  Events */
  ngOnInit() {
    this.getProfile();
  }
  /* #endregion */

  /* #region  Methods */
  getProfile() {
    this.userProfileService.getById(Number(this.authService.currentUser.decodedToken.profileId), 'userProfileId').subscribe(response => {
      if (response && response.success) {
        this.userProfile = response.resource;
      } else {
        this.alertService.errorMsg(response.message || 'errors.errorOccured');
        this.authService.logout();
      }
    }, error => {
      this.alertService.error(error);
      this.authService.logout();
    });
  }
  logout() {
    this.authService.logout();
  }
  getProfileImage() {
    return this.userProfileService.getProfileImagePath(this.userProfile.imagePath);
  }
  /* #endregion */
}
