import { FC, memo } from "react";

import styles from "./style.module.scss";
import Slider from "react-slick";
import DestinationCard from "../../../components/common/DestinationCard";
import { IDestination } from "@/types/services/destination";

type Props = {};

const sliderSettings = {
  // dots: true,
  // arrows: true,
  infinite: true,
  // autoplay: true,
  // swipeToSlide: true,
  // speed: 1000,
  // autoplaySpeed: 5000,
  // accessibility: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  // focusOnSelect: true,
  // responsive: [
  //   {
  //     breakpoint: 1240,
  //     settings: {
  //       slidesToScroll: 3,
  //       slidesPerRow: 1,
  //     },
  //   },
  //   {
  //     breakpoint: 576,
  //     settings: {
  //       slidesToScroll: 2,
  //       slidesPerRow: 2,
  //       // dots: false
  //     },
  //   },
  // ],
};

const destinations: IDestination[] = [
  {
    id: "1",
    name: "Hà Nội",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/hanoi.png?alt=media&token=aeb6a53b-6a90-4f2c-8176-81c4a065b7ec",
    description: "",
  },
  {
    id: "2",
    name: "Đà Nẵng",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/danang.png?alt=media&token=7244a048-24c0-4c5c-9fd5-43c6874e489c",
    description: "",
  },
  {
    id: "3",
    name: "Sài Gòn",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/saigon.png?alt=media&token=aaf08f76-7219-4606-a9f3-3d06c454ea68",
    description: "",
  },
  {
    id: "4",
    name: "Ninh Bình",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/ninhbinh.png?alt=media&token=a6e6cde7-b5ca-4465-8663-62bf2a1a73ed",
    description: "",
  },
  {
    id: "5",
    name: "Đà Lạt",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/dalat.png?alt=media&token=a6466f26-0ac2-4571-9ec6-605135b3cc20",
    description: "",
  },
  {
    id: "6",
    name: "Phú Quốc",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/phuquoc.png?alt=media&token=ba6efe2e-f9fa-4d0a-8292-0dccf8a873ea",
    description: "",
  },
  {
    id: "7",
    name: "Sapa",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/sapa.png?alt=media&token=01872a05-c4b4-4ebb-891e-076d8c6fed50",
    description: "",
  },
  {
    id: "8",
    name: "Hội An",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/hoian.png?alt=media&token=963758f4-7a33-40a3-863b-f4333a023d93",
    description: "",
  },
  {
    id: "9",
    name: "Hạ Long",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/halong.png?alt=media&token=0017ea14-c434-40d7-82a0-0294050a0c0b",
    description: "",
  },
];

const HomeDestinations: FC<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>ĐIỂM ĐẾN HẤP DẪN</div>
      <div className={styles.content}>
        <Slider {...sliderSettings} className="home_banner">
          {destinations.map((item) => (
            <DestinationCard key={item.id} data={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default memo(HomeDestinations);
