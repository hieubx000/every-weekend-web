import { AxiosResponse } from "axios";
import requestApi from "../requestApi";
import { Tour } from "@/types/api/tour";

export const postCreateTourApi = async (
  data: Tour.TourDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().post("/tour", data);

  return res;
};

export const patchUpdateTourApi = async (
  id: string,
  data: Tour.TourDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().patch(`/tour/${id}`, data);

  return res;
};

export const getAllTourApi = async (params?: any): Promise<AxiosResponse> => {
  const res = await requestApi().get("/tour", { params: params });

  return res;
};

export const getTourByIdApi = async (id: string): Promise<AxiosResponse> => {
  const res = await requestApi().get(`/tour/${id}`);

  return res;
};

export const getTourBySlugApi = async (
  slug: string,
): Promise<AxiosResponse> => {
  const res = await requestApi().get(`/tour/slug/${slug}`);

  return res;
};

export const deleteTourApi = async (id: string): Promise<AxiosResponse> => {
  const res = await requestApi().delete(`/tour/${id}`);

  return res;
};
