export interface IAuthData {
  username: string;
  password: string;
}

export interface ISignupData {
  user: {
    username: string;
    id: number;
  };
  token: string;
}
