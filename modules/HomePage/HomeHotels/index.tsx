import { FC, memo, useCallback, useEffect, useState } from "react";

import styles from "./style.module.scss";
import { ITour } from "@/types/services/tour";
import TourCard from "@/components/common/TourCard";
import { Mock_Data_Tours } from "@/public/assets/mockData/tour";
import HotelCard from "@/components/common/HotelCard";
import { IHotel } from "@/types/services/hotels";
import { getAllHotelApi } from "@/pages/api/services/hotel";

type Props = {};

const HomeHotels: FC<Props> = ({}) => {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const getData = useCallback(async () => {
    try {
      const response = await getAllHotelApi({page: 1, limit: 5});
      setHotels(response.data.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Khách Sạn</div>
      <div>
        <div className={styles.content}>
          {hotels.map((item, index) => (
            <HotelCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(HomeHotels);
