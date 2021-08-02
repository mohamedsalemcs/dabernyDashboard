import { DurationTypes } from "./durationTypes";

export interface QuestionAddVM {
  title: string;
  tags: number[];
  interestId: number;
  interests: number;
  closureTimeScalar: number;
  duraionType: DurationTypes;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  attachment: any;
}


