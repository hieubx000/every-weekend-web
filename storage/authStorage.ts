import { storageConstant } from "@/constants/storageConstant";
import { UserProfile } from "@/types/user";

const clearDataStorage = () => {
  localStorage.clear();
};

const setUserProfile = (data: UserProfile) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      storageConstant.localStorage.userProfile,
      JSON.stringify(data),
    );
  }
};

const getUserProfile = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(storageConstant.localStorage.userProfile);
  }
};

export const authStorage = {
  setUserProfile,
  getUserProfile,
  clearDataStorage,
};
