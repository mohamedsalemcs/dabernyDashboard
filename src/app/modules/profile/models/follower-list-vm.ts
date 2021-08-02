export interface FollowerInterest {
  id: number;
  name: string;
  imagePath: string;
}

export interface FollowerListVm {
  id: number;
  followerId: number;
  userProfileId: number;
  followerName: string;
  followerImagePath: string;
  followerInterests: FollowerInterest[];
  isFollowedByMe: boolean;
  isFollowingMe: boolean;
  createdAt: Date;

  isLoading?: boolean;

}
