import { IDestination } from "./destination";

export type ITour = {
    id: string;
    name: string;
    bannerUrl: string;
    imageUrls: string[];
    quantity: number;
    price: number;
    discount: number;
    favoriteNumber: number;
    destinationId: string;
    departure: string;
    dayTime: number;
    supplierId: string;
    startTime: number;
    concentrationTime: number;
    vehicle: string;
    sightseeing: string;
    cuisine: string;
    hotelId: string;
    suitablePerson: string;
    highlight: string;
    schedule: string;
    tourGuideId: string;
}