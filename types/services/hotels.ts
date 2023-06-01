export type IHotel = {
    id: string;
    imageUrls: string[];
    destinationId: string;
    name: string;
    address: string;
    phoneNumber: string;
    about: string;
    facilities: number[];
    rule: HotelRules;
    availability: Room[];
    rating: number;
    faqs: FAQS[];
}

export type HotelRules ={
    checkIn?: string;
    checkOut?: string;
}

export type Room = {
    id: string;
    name: string;
    imageUrl: string;
    acreage: number;
    noOfBeds: number;
    amount: number;
    wifi: boolean;
    price: number;
    quantity: number;
}

export type FAQS = {
    id: string;
    question: string;
    answer: string;
}