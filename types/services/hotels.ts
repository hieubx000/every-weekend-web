import { Address } from "../common";

export type IHotel = {
  id?: string;
  imageUrl: string[];
  slug?: string;
  toDestination: string;
  title: string;
  address: Address[];
  introduction: string;
  introLink: string;
  hotelService: number[];
  rule?: HotelRules;
  availability: Room[];
  rating?: number;
  faqs?: FAQS[];
  price?: number;
};

export type HotelRules = {
  checkIn?: string;
  checkOut?: string;
};

export type Room = {
  title: string;
  imageUrl?: string;
  acreage: number;
  noOfBeds: number;
  amount: number;
  price: number;
  quantity: number;
  roomService?: number[];
};

export type FAQS = {
  id: string;
  question: string;
  answer: string;
};
