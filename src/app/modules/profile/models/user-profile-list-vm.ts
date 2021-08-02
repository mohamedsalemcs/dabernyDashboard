export interface UserProfileListVM {
  id: number;
  userProfileId: number;
  userProfileName: string;
  userProfileImagePath: string;
  userProfileInterests: {
    id: number;
    name: string;
    imagePath: string;
  }[];
  isFollowedByMe: boolean;
  isFollowingMe: boolean;
  isBlockedByMe: boolean;
  createdAt: Date;

  isLoading?: boolean;
}
