import { MdOutlineAirportShuttle, MdSportsGymnastics } from "react-icons/md";

const hotelFacilities = [
  {
    id: "1",
    value: 1,
    title: "Vận chuyển sân bay",
    icon: <MdOutlineAirportShuttle />,
  },
  {
    id: "2",
    value: 2,
    title: "Phòng Gym",
    icon: <MdSportsGymnastics />,
  },
];

export const blogCategory = [
  {
    id: 1,
    name: "Tin tức du lịch",
  },
  {
    id: 2,
    name: "Điểm đến thú vị",
  },
  {
    id: 3,
    name: "Ẩm thực",
  },
  {
    id: 4,
    name: "Bàn luận",
  },
];

export const statusList = [
  {
    id: 1,
    name: "Chờ kiểm duyệt",
  },
  {
    id: 2,
    name: "Công khai",
  },
  {
    id: 3,
    name: "Bị ẩn",
  },
];

export default { hotelFacilities };
