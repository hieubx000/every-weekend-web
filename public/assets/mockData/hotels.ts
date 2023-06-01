import { IHotel } from "@/types/services/hotels";

const Mock_Data_Hotels: IHotel[] = [
  {
    id: "1",
    imageUrls: [
      "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Bar-on-property-1-1.png",
      "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Bar-on-property-2-1.png",
      "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Bar-on-property-4.png",
      "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Fitness-facility-4.png",
      "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Reception.png",
    ],
    name: "Mường Thanh Grand Bãi Cháy (Muong Thanh Grand Bai Chay)",
    destinationId: "111",
    address:
      "No 20, Ha Long Road,Bai Chay Ward, Ha Long City, Quang Ninh , Viet Nam, Hạ Long, Hạ Long, Việt Nam",
    about:
      "Đỗ xe và Wi-Fi luôn miễn phí, vì vậy quý khách có thể giữ liên lạc, đến và đi tùy ý. Nằm ở vị trí chiến lược tại Hạ Long, cho phép quý khách lui tới và gần với các điểm thu hút và tham quan địa phương. Đừng rời đi trước khi ghé thăm Hang Sửng Sốt nổi tiếng. Được xếp hạng 4 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng mát-xa, bể bơi ngoài trời và bồn tắm nước nóng ngay trong khuôn viên.",
    phoneNumber: "0963626914",
    facilities: [1, 2, 3, 4, 5, 6],
    rule: { checkIn: "12:00pm", checkOut: "12:00am" },
    availability: [
      {
        id: "av1",
        imageUrl: "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Jumeirah-Emirates-Towers-800x600.png",
        name: "Phòng Tiêu Chuẩn Giường Đôi",
        acreage: 170,
        amount: 2,
        noOfBeds: 1,
        wifi: true,
        price: 12000000,
        quantity: 2,
      },
      {
        id: "av1",
        imageUrl: "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Jumeirah-Emirates-Towers-800x600.png",
        name: "Phòng Tiêu Chuẩn Giường Đôi",
        acreage: 170,
        amount: 2,
        noOfBeds: 1,
        wifi: true,
        price: 12000000,
        quantity: 2,
      },
    ],
    faqs: [{ id: "", question: "", answer: "" }],
    rating: 5,
  },
  {
    id: "12",
    imageUrls: [
      "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Bar-on-property-1-1.png",
      "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Bar-on-property-2-1.png",
      "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Bar-on-property-4.png",
      "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Fitness-facility-4.png",
      "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Reception.png",
    ],
    name: "Mường Thanh Grand Bãi Cháy (Muong Thanh Grand Bai Chay)",
    destinationId: "111",
    address:
      "No 20, Ha Long Road,Bai Chay Ward, Ha Long City, Quang Ninh , Viet Nam, Hạ Long, Hạ Long, Việt Nam",
    about:
      "Đỗ xe và Wi-Fi luôn miễn phí, vì vậy quý khách có thể giữ liên lạc, đến và đi tùy ý. Nằm ở vị trí chiến lược tại Hạ Long, cho phép quý khách lui tới và gần với các điểm thu hút và tham quan địa phương. Đừng rời đi trước khi ghé thăm Hang Sửng Sốt nổi tiếng. Được xếp hạng 4 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng mát-xa, bể bơi ngoài trời và bồn tắm nước nóng ngay trong khuôn viên.",
    phoneNumber: "0963626914",
    facilities: [1, 2, 3, 4, 5, 6],
    rule: { checkIn: "12:00pm", checkOut: "12:00am" },
    availability: [
      {
        id: "av1",
        imageUrl: "https://modtel.travelerwp.com/wp-content/uploads/2022/04/Jumeirah-Emirates-Towers-800x600.png",
        name: "Phòng Tiêu Chuẩn Giường Đôi",
        acreage: 170,
        amount: 2,
        noOfBeds: 1,
        wifi: true,
        price: 12000000,
        quantity: 2,
      },
    ],
    faqs: [{ id: "", question: "", answer: "" }],
    rating: 5,
  },
];

export { Mock_Data_Hotels };
