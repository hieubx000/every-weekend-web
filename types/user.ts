import { User } from "./common";
import { Role } from "./commonTypes";

export type UserProfile = {
  token?: string;
  role?: Role;
  profile?: User;
};
