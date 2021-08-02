import { User, Country, UserProfileInterest, UserProfileRank } from "./user-profile-interest";

export interface UserProfile {
  id: number;
  userId: number;
  email: string;
  countryCode: string;
  imagePath: string;
  questionsCount: number;
  followingCount: number;
  followedByCount: number;
  createdAt: Date;
  modifiedAt: Date;
  user: User;
  country: Country;
  userProfileInterests: UserProfileInterest[];
  userProfileRanks: UserProfileRank[];
  countryName: string;
  isBlockedByMe: boolean;
  isFollowedByMe: boolean;
  isFollowingMe: boolean;
}
