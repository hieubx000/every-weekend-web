import { AxiosResponse } from "axios";
import requestApi from "../requestApi";
import { BookingTour } from "@/types/api/booking-tour";

export const postCreateBookTourApi = async (
  data: BookingTour.BookingTourDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().post("/booking-tour", data);

  return res;
};

export const changeStatusBookTourApi = async (
  id: string,
  data: BookingTour.BookingTourDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().patch(`/booking-tour/${id}`, data);

  return res;
};

export const getAllBookingTourApi = async (
  params?: any,
): Promise<AxiosResponse> => {
  const res = await requestApi().get("/booking-tour", { params: params });

  return res;
};
