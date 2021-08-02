export interface UpdateProfileVM {
  countryCode: string;
  fullName: string;
  username: string;
  image: Blob;
  email: string;
  interests: {
    InterestIds: []
  }
}
