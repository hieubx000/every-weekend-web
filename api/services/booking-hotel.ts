import { AxiosResponse } from "axios";
import requestApi from "../requestApi";
import { BookingHotel } from "@/types/api/booking-hotel";

export const postCreateBookHotelApi = async (
  data: BookingHotel.BookingHotelDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().post("/booking-hotel", data);

  return res;
};

export const getAllBookingHotelApi = async (
  params?: any,
): Promise<AxiosResponse> => {
  const res = await requestApi().get("/booking-hotel", { params: params });

  return res;
};
