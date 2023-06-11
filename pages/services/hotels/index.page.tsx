import { FC, memo, useCallback, useEffect, useState } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import HotelSidebar from "@/modules/Services/Hotels/HotelSidebar";
import { Mock_Data_Hotels as datas } from "@/public/assets/mockData/hotels";
import HotelCard from "@/components/common/HotelCard";
import { getAllHotelApi } from "@/api/services/hotel";
import { IHotel } from "@/types/services/hotels";

type Props = {};

const Hotels: FC<Props> = ({}) => {
  const [tours, setTours] = useState<IHotel[]>([]);
  const getData = useCallback(async () => {
    try {
      const response = await getAllHotelApi();
      setTours(response.data.data);
    } catch (error) {}
  }, []);

  console.log("MTS2023",tours);
  

  useEffect(() => {
    getData();
  }, []);
  return (
    <MainLayout center>
      <div className={styles.container}>
        <HotelSidebar />
        <div className={styles.content}>
          {tours.map((item) => (
            <HotelCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default memo(Hotels);
