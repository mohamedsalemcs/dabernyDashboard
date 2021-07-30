import { LoginMethods } from '../enums/LoginMethods';

export interface UserRegisterationVM {
  fullName: string;
  username: string;
  password: string;
  loginMethodId: LoginMethods;
  profile: {
    email: string;
    countryCode: string;
  };
}
