import { ITour } from "../services/tour";

declare namespace BookingTour {
  interface BookingTourDataPayload {
    cName: string;
    cEmail: string;
    cPhone: string;
    cAddress?: string;
    customer: {
      fullName: string;
      gender: number;
      birthDay: number;
      cccd?: string;
    }[];
    totalCustomer: number;
    discount?: number;
    note?: string;
    tour: string | ITour;
    price?: string;
    totalPrice?: string;
    status?: number;
    createdAt?: string;
  }
}
