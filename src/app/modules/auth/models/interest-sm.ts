import { SearchModel } from "../../core/models/searchmodel";

export class InterestSM extends SearchModel {
  showGeneral: boolean;
  constructor(showGeneral: boolean) {
    super('', 1, 5000);
    this.showGeneral = showGeneral;
  }
}
