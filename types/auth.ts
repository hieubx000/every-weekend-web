declare namespace Auth {
  interface SignupDataPayload {
    userName: string;
    password: string;
    name: string;
    phoneNumber?: number;
    address?: number;
  }

  interface SignInDataPayload {
    userName: string;
    password: string;
  }

  interface UpdateProfilePayload {
    avatar: string;
    name: string;
    birthday?: number;
    address?: number;
    phoneNumber?: number;
    email?: string;
  }
}
