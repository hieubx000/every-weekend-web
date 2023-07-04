import { AxiosResponse } from "axios";
import requestApi from "../requestApi";
import { Tour } from "@/types/api/tour";
import { Hotel } from "@/types/api/hotel";

export const postCreateHotelApi = async (
  data: Hotel.HotelDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().post("/hotel", data);

  return res;
};

export const patchUpdateHotelApi = async (
  id: string,
  data: Hotel.HotelDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().patch(`/hotel/${id}`, data);

  return res;
};

export const getAllHotelApi = async (params?: any): Promise<AxiosResponse> => {
  const res = await requestApi().get("/hotel", { params: params });

  return res;
};

export const getHotelByIdApi = async (id: string): Promise<AxiosResponse> => {
  const res = await requestApi().get(`/hotel/${id}`);

  return res;
};

export const getHotelBySlugApi = async (
  slug: string,
): Promise<AxiosResponse> => {
  const res = await requestApi().get(`/hotel/slug/${slug}`);

  return res;
};

// export const deleteTourApi = async (id: string): Promise<AxiosResponse> => {
//   const res = await requestApi().delete(`/tour/${id}`);

//   return res;
// };
