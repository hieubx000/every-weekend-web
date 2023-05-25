import { IDestination } from "./destination";

export type ITour = {
    id: string;
    name: string;
    bannerUrl: string;
    imageUrls: string[];
    description?: string;
    quantity: number;
    price: number;
    discount: number;
    favoriteNumber: number;
    rating?: number;
    destinationId: string;
    departure: string;
    dayTime: number;
    supplierId: string;
    startTime: number;
    concentrationTime: number;
    convetratePlace?: string;
    vehicle: string;
    sightseeing: string;
    cuisine: string;
    hotelId: string;
    suitablePerson: string;
    highlight: string;
    schedule: {
        title: string;
        content: string;
    }[];
    tourGuideId: string;
}