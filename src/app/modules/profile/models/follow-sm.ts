import { SearchModel } from "../../core/models/searchmodel";

export class FollowSM extends SearchModel {
  userProfileId?: number;

  constructor(userProfileId: number) {
    super();
    this.userProfileId = userProfileId;
  }
}
