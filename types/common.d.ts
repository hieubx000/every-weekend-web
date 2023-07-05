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

export type Address = {
  address: string;
  latitude: number;
  longitude: number;
};

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

export interface Blog extends Blog.BlogDataPayload {
  id: string;
}
export interface Destination extends Destination.DestinationDataPayload {
  id: string;
  _id?: string
}
