import { storageConstant } from "@/constants/storageConstant";
import { User } from "@/types/common";

const setUserToken = (token: string) => {
  localStorage.setItem(storageConstant.localStorage.userToken, token);
};

const getUserToken = () => {
  return localStorage.getItem(storageConstant.localStorage.userToken);
};

const setUserProfile = (profile: User) => {
  localStorage.setItem(
    storageConstant.localStorage.userProfile,
    JSON.stringify(profile),
  );
};

const getUserProfile = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(storageConstant.localStorage.userProfile) || "";
  }
};

const clearDataStorage = () => {
  localStorage.clear();
};

export const authStorage = {
  setUserToken,
  getUserToken,
  setUserProfile,
  getUserProfile,
  clearDataStorage,
};
