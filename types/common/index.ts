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
  email: string;
  avatar: string;
  address: number;
};
