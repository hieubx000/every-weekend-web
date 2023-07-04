import { IHotel } from "../services/hotels";

declare namespace BookingHotel {
  interface BookingHotelDataPayload {
    totalCustomer: number;
    totalRoom: number;
    checkIn: number;
    checkOut: number;
    totalPrice: number;
    note?: string;
    hotel: string | IHotel;
    status?: number;
  }
}
