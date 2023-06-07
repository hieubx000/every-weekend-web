import { AxiosResponse } from "axios";
import requestApi from "../requestApi";

export const getListAccountApi = async (): Promise<AxiosResponse> => {
  const res = await requestApi().get("/user");

  return res;
};

export const postRegister = async (
  data: Auth.SignupDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().post("/auth/register", data);

  return res;
};

export const postLogInApi = async (
  data: Auth.SignInDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().post("/auth/login", data);

  return res;
};

export const patchUpdateProfileApi = async (
  id: string,
  data: Auth.UpdateProfile,
): Promise<AxiosResponse> => {
  const res = await requestApi().patch(`/user/${id}`, data);

  return res;
};
