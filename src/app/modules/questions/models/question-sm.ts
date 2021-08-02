import { SearchModel } from "../../core/models/searchmodel";

export class QuestionSM extends SearchModel {
  userProfileId: number;
  title: string;
  userProfileFullName: string;
  tageName: string;
  countryName: string;
  username: string;

  constructor(
    userProfileId: number,
    title?: string,
    userProfileFullName?: string,
    tageName?: string,
    countryName?: string,
    username?: string) {
    super();
    this.userProfileId = userProfileId;
    this.title = title;
    this.userProfileFullName = userProfileFullName;
    this.tageName = tageName;
    this.countryName = countryName;
    this.username = username;
  }
}
