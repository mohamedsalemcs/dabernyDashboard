import { LoginMethods } from "../../auth/enums/LoginMethods";
import { UserProfile } from "./UserProfileVM";


export interface Interest {
  id: number;
  nameEn: string;
  nameAr: string;
  imagePath: string;
  isGeneral: boolean;
}

export interface User {
  id: number;
  fullName: string;
  username: string;
  passwordHash: string;
  passwordSalt: string;
  loginMethodId: LoginMethods;
  createdAt: Date;
  modifiedAt: Date;
  isActive: boolean;
  isVerified: boolean;
  isInterestEntered: boolean;
  verificationCode: string;
  forgetPasswordCode: string;
  email: string;
}

export interface Country {
  code: string;
  nameEn: string;
  nameAr: string;
  nationalityNameEn: string;
  nationalityNameAr: string;
}

export interface Rank {
  id: number;
  nameEn: string;
  nameAr: string;
  requiredPoints: number;
}

export interface UserProfileRank {
  id: number;
  userProfileId: number;
  rankId: number;
  interestId: number;
  points: number;
  rank: Rank;
  interest: Interest;
}


export interface UserProfileInterest {
  id: number;
  userProfileId: number;
  interestId: number;
  interestName: string;
  currentUserPoints: number;
  rankId: number;
  rankName: string;
  rankPoints: number;
  nextRankId: number;
  nextRankName: string;
  nextRankPoints: number;
  createdAt: Date;
  modifiedAt: Date;
  userProfile: UserProfile;
  interest: Interest;
  rankPercent: number;
}
