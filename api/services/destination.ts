import { AxiosResponse } from "axios";
import requestApi from "../requestApi";

export const postCreateDestinationApi = async (
  data: Destination.DestinationDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().post("/destination", data);

  return res;
};

export const patchUpdateDestinationApi = async (
  id: string,
  data: Destination.DestinationDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().patch(`/destination/${id}`, data);

  return res;
};

export const getAllDestinationApi = async (
  params?: any,
): Promise<AxiosResponse> => {
  const res = await requestApi().get("/destination", { params: params });

  return res;
};

export const getDestinationByIdApi = async (
  id: string,
): Promise<AxiosResponse> => {
  const res = await requestApi().get(`/destination/${id}`);

  return res;
};
