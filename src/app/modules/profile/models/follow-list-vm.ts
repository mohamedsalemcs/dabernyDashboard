import { FollowerInterest } from "./follower-list-vm";

export interface FollowingListVM {
  id: number;
  followerId: number;
  userProfileId: number;
  userProfileName: string;
  userProfileImagePath: string;
  userProfileInterests: FollowerInterest[];
  isFollowedByMe: boolean;
  isFollowingMe: boolean;
  createdAt: Date;

  isLoading?: boolean;
}
