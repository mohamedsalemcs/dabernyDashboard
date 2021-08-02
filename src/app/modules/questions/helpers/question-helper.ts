import { QuestionListVM } from "../models/question-list-vm";

export class QuestionHelper {
  public static getVotePercent(question: QuestionListVM, voteCount: number) {
    let percent = 0;
    if (question && voteCount > 0) {
      const sum = question.option1VotesCount + question.option2VotesCount + question.option3VotesCount + question.option4VotesCount;
      if (sum > 0) {
        return (voteCount * 100) / sum;
      }
    }
    return percent;
  }
}
