import { FC, memo } from "react";

import styles from "./style.module.scss";
import Slider from "react-slick";

type Props = {};

const sliderSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  swipeToSlide: true,
  speed: 1000,
  autoplaySpeed: 5000,
  slidesToShow: 5,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        // slidesToScroll: 2,
        slidesPerRow: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        // slidesToScroll: 1,
        slidesPerRow: 1,
        // dots: false
      },
    },
  ],
};

const HomeDestinations: FC<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>ĐIỂM ĐẾN HẤP DẪN</div>
      <div className={styles.content}>
        <Slider {...sliderSettings} className="home_banner">
          <div>
            ahi
          </div>
          <div>
            ahi
          </div>
          <div>
            ahi
          </div>
          <div>
            ahi
          </div>
          <div>
            ahi
          </div>
          <div>
            ahi
          </div>
          <div>
            ahi
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default memo(HomeDestinations);
