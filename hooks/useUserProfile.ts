import { authStorage } from "@/storage/authStorage";
import { User } from "@/types/common";
import { Role } from "@/types/commonTypes";
import { UserProfile } from "@/types/user";
import { useMemo, useCallback, useState, useRef, useEffect } from "react";

const useUserProfile = () => {
  const [userRole, setUserRole] = useState<Role>();
  const [userToken, setUserToken] = useState<string>();
  const [userProfile, setUserProfile] = useState<User>();

  useEffect(() => {
    if (authStorage.getUserProfile()) {
      const profile = JSON.parse(
        authStorage.getUserProfile() || "",
      ) as UserProfile;

      setUserToken(profile.token);
      setUserRole(profile.role);
      setUserProfile(profile.profile);
    }
  }, [authStorage]);

  return { userRole, userToken, userProfile };
};

export default useUserProfile;
