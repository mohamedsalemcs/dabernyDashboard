/* #region  Imports */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { DateHelper } from 'src/app/modules/core/helpers/date-helper';
import { FileHelper } from 'src/app/modules/core/helpers/file-helper';
import { BaseResponse } from 'src/app/modules/core/models/BaseResponse';
import { BaseDataService } from 'src/app/modules/core/services/base-data-service/base-data-service';
import { QuestionHelper } from '../../helpers/question-helper';
import { QuestionListVM } from '../../models/question-list-vm';
import { QuestionUpdateVM } from '../../models/question-update-vm';

/* #endregion */

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseDataService<QuestionListVM> {

  /* #region  Constructor */
  constructor(
    http: HttpClient
  ) {
    super(http, `${environment.apiUrl}/Question`);
  }
  /* #endregion */
  delete(id: number) {
    return this.http.delete<BaseResponse<any>>(`${this.serviceBaseUrl}?id=${id}`);
  }
  configureQuestionVotesPercent(question: QuestionListVM) {
    if (question) {
      question.isVideo = FileHelper.isVideo(question.attachmentPath);
      question.option1VotesPercent = QuestionHelper.getVotePercent(question, question.option1VotesCount);
      question.option2VotesPercent = QuestionHelper.getVotePercent(question, question.option2VotesCount);
      question.option3VotesPercent = QuestionHelper.getVotePercent(question, question.option3VotesCount);
      question.option4VotesPercent = QuestionHelper.getVotePercent(question, question.option4VotesCount);
    }
  }
  configureQuestionIsVedio(question: QuestionListVM) {
    if (question) {
      question.isVideo = FileHelper.isVideo(question.attachmentPath);
    }
  }
  configureQuestionClosureDate(question: QuestionListVM) {
    if (question) {
      question.closureTimeUTCDate = DateHelper.toLocalDateFromStr(question.closureTimeUTC);
    }
  }
  configureQuestionsVotesPercent(questions: QuestionListVM[]) {
    if (questions && questions.length > 0) {
      for (let index = 0; index < questions.length; index++) {
        this.configureQuestionVotesPercent(questions[index]);
        this.configureQuestionIsVedio(questions[index]);
        this.configureQuestionClosureDate(questions[index]);
      }
    }

  }

  updateQuestion(id, entity): Observable<BaseResponse<QuestionListVM>> {
    return this.http.put<BaseResponse<QuestionListVM>>(`${this.serviceBaseUrl}/${id}`, entity);
  }
}
