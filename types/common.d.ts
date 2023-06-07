declare namespace CommonGlobal {
  interface AddressJobInfo {
    address?: string;
    latitude?: number;
    longitude?: number;
  }

  interface AddressUser {
    isMain: boolean;
    idAddress: number;
    address: string;
    communeId: number;
    districtId: number;
    provinceId: number;
    latitude: number;
    longitude: number;
  }
}

interface ErrorResponseApi {
  // error Ơ

  cause: string | unknown;
  errorCode: number;
  message: string;
}

export enum Role {
  guest = 0,
  customer = 1,
  supplier = 2,
  admin = 3,
}

export type User = {
  id: string;
  userName: string;
  name: string;
  role: Role;
  birthday: number;
  phoneNumber: number;
  email: string;
  avatar: string;
  address: number;
};
