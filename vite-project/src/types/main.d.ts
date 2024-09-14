export interface IAuthData {
  username: string;
  password: string;
}

export interface IFormData {
  user: {
    username: string;
    id: number;
  };
  token: string;
}

export interface IErrorHandler {
  response: {
    data: {
      error: string;
      message: string[];
      statusCode: number;
    };
  };
}

export interface IGetUser {
  id: number;
  username: string;
  cart: [];
  sessions: [
    {
      id: number;
      token: string;
      expiration: number;
    },
    {
      id: number;
      token: string;
      expiration: number;
    }
  ];
}

export interface IParams {
  page: number;
  limit: number;
  brands?: string;
  search: string;
}

export interface ISneakerList {
  id: number;
  pid: number;
  name: string;
  imageURL: string;
  colors: string;
  sizes: string;
  price: number;
  category: string;
  gender: string;
  brand: string;
}

export interface ISneakerResponse {
  data: ISneakerList[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface IGetSneaker {
  page: number;
  limit: number;
  search: string;
  brands?: string;
}
