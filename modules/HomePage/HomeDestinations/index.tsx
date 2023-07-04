import { FC, memo, useCallback, useEffect, useState } from "react";

import styles from "./style.module.scss";
import Slider from "react-slick";
import DestinationCard from "../../../components/common/DestinationCard";
import { IDestination } from "@/types/services/destination";
import { Destination } from "@/types/common";
import { handleError } from "@/utils/helper";
import { getAllDestinationApi } from "@/pages/api/services/destination";

type Props = {};

const sliderSettings = {
  // dots: true,
  // arrows: true,
  infinite: true,
  autoplay: true,
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

const HomeDestinations: FC<Props> = ({}) => {
  const [destinations, setDestination] = useState<Destination[]>([]);

  const getData = useCallback(async () => {
    try {
      const response = await getAllDestinationApi();

      setDestination(response.data.data);
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  console.log(destinations);

  return (
    <div className={styles.container}>
      <div className={styles.title}>ĐIỂM ĐẾN HẤP DẪN</div>
      <div className={styles.content}>
        <Slider {...sliderSettings} className="home_banner">
          {destinations.map((item, index) => (
            <DestinationCard key={index} data={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default memo(HomeDestinations);
