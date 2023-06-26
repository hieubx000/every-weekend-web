import { FC, memo, useCallback, useEffect, useState } from "react";

import styles from "./style.module.scss";
import { ITour } from "@/types/services/tour";
import TourCard from "@/components/common/TourCard";
import { Mock_Data_Tours } from "@/public/assets/mockData/tour";
import { getAllTourApi } from "@/api/services/tour";

type Props = {};

const HomeHotels: FC<Props> = ({}) => {
  // const [tours] = useState(Mock_Data_Tours);

  const [tours, setTours] = useState<ITour[]>([]);
  const getData = useCallback(async () => {
    try {
      const response = await getAllTourApi();
      setTours(response.data.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Tour du lịch</div>
      <div>
        <div className={styles.content}>
          {tours.map((item, index) => (
            <TourCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(HomeHotels);
