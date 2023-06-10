import { Address, User } from "../common";

export type ITour = {
  id?: string;
  title: string;
  slug?: string;
  createdBy?: User;
  imageUrl: string[];
  about: string;
  fromDate: number;
  startTime: number;
  beforeStartTime: number;
  gatheringPlace: Address[];
  numOfDays: number;
  maxSlot: number;
  used?: number;
  vehicle: string[];
  sightseeing: string[];
  price: number;
  discount: number;
  schedule: {
    label: string;
    content: string;
  }[];
  tourGuide: string;
  fromDestination: number;
  toDestination: string;
  introduction: string;
  introLink: string;
  rate?: number;
};
