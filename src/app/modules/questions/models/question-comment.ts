export interface Rank {
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

export interface QuestionComment {
  id: number;
  userFullName: string;
  userProfileId: string;
  userProfilImagePath: string;
  rank: Rank;
  questionId: number;
  content: string;
  createdAt: string;
  modifiedAt: Date;
}
