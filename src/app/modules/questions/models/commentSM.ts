import { SearchModel } from "../../core/models/searchmodel";

export class CommentSM extends SearchModel {
  questionId: number;
  constructor(questionId) {
    super();
    this.questionId = questionId;
  }
}
