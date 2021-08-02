import { SearchModel } from "../../core/models/searchmodel";

export class UserProfileInterestSM extends SearchModel {
  userProfileId?: number;
  showGeneral: boolean;

  constructor(userProfileId: number, showGeneral: boolean) {
    super('', 1, 100);
    this.userProfileId = userProfileId;
    this.showGeneral = showGeneral;
  }
}
