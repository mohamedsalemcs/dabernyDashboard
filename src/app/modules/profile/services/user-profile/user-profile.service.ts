/* #region  Imports */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { BaseResponse } from 'src/app/modules/core/models/BaseResponse';
import { SearchModel } from 'src/app/modules/core/models/searchmodel';
import { BaseDataService } from 'src/app/modules/core/services/base-data-service/base-data-service';
import { UserProfileListVM } from '../../models/user-profile-list-vm';
import { UserProfileInterest } from '../../models/user-profile-interest';
import { UserProfile } from '../../models/UserProfileVM';
import { PagedListResult } from 'src/app/modules/core/models/PagedListResult';

/* #endregion */

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends BaseDataService<UserProfile> {

  /* #region  Constructor */
  constructor(
    http: HttpClient
  ) {
    super(http, `${environment.apiUrl}/UserProfile`);
  }
  /* #endregion */

  /* #region  Methods */

  usernameExists(username: string) {
    return this.http.get<BaseResponse<boolean>>(`${this.serviceBaseUrl}/UsernameExists?username=${username}`);
  }

  emailExists(email: string) {
    return this.http.get<BaseResponse<boolean>>(`${this.serviceBaseUrl}/EmailExists?email=${email}`);
  }

  listUserProfiles(searchModel: SearchModel) {
    return this.http.get<PagedListResult<UserProfileListVM>>(
      `${this.serviceBaseUrl}/ListUserProfiles?${this.getQueryParams(searchModel)}`
    );
  }

  configInterestRankPercent(userProfileInterests: UserProfileInterest[]) {
    if (userProfileInterests && userProfileInterests.length > 0) {
      for (let index = 0; index < userProfileInterests.length; index++) {
        const interest = userProfileInterests[index];
        const devide = interest.nextRankPoints - interest.rankPoints;
        if (devide > 0) {
          interest.rankPercent = ((100 * (interest.currentUserPoints - interest.rankPoints)) / devide) || 0;
          if (interest.rankPercent < 0) {
            interest.rankPercent = 0;
          }
        } else {
          interest.rankPercent = 0;
        }
      }
    }
  }
  getProfileImagePath(imagePath: string) {
    if (imagePath) {
      if (imagePath.toLowerCase().indexOf('http://') > -1 || imagePath.toLowerCase().indexOf('https://') > -1) {
        return imagePath;
      } else {
        return environment.dabernyServerUrl + imagePath;
      }
    }
    return 'assets/images/user.png';
  }
  /* #endregion */
}
