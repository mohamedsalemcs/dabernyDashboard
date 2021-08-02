import { UserProfile } from '../../profile/models/UserProfileVM';
import { QuestionInterest } from './QuestionInterest';


export interface User {
  id: number;
  fullName: string;
  username: string;
  loginMethodId: number;
  createdAt: Date;
  modifiedAt: Date;
  isActive: boolean;
  isVerified: boolean;
  isInterestEntered: boolean;
}


export interface UserProfileRank {
  id: number;
  userProfileId: number;
  points: number;
  rankId: number;
  nextRankId: number;
  interestId: number;
  interestName: string;
  rankName: string;
  nextRankName: string;
}


export interface QuestionTag {
  id: number;
  questionId: number;
  tagId: number;
  tagName: string;
}


export interface QuestionListVM {
  id: number;
  userProfileId: number;
  userProfileFullName: string;
  username: string;
  statusId: number;
  title: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option1VotesCount: number;
  option2VotesCount: number;
  option3VotesCount: number;
  option4VotesCount: number;

  option1VotesPercent: number;
  option2VotesPercent: number;
  option3VotesPercent: number;
  option4VotesPercent: number;
  todayVotesCount: number;
  votesCount: number;

  currentUserDisliked: boolean;
  currentUserLiked: boolean;
  currentUserOption1Voted: boolean;
  currentUserOption2Voted: boolean;
  currentUserOption3Voted: boolean;
  currentUserOption4Voted: boolean;

  attachmentPath: string;
  attachment: string;
  isVideo: boolean;
  likesCount: number;
  commentsCount: number;
  closureTimeScalar: number;
  closureTimeUTC: string;
  createdAt: Date;
  updatedAt: Date;
  userProfile: UserProfile;
  questionTags: QuestionTag[];
  questionInterests: QuestionInterest[];

  isLoading: boolean;
  closureTimeUTCDate: Date;

}

