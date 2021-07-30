import { DecodedUser } from "./DecodedUser";

export interface UserRegisterationResult {
  token: string;
  isActive: boolean;
  isVerified: boolean;
  isInterestEntered: boolean;


  decodedToken?: DecodedUser;
}
