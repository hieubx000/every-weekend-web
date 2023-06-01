import { FC, memo } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import HotelSidebar from "@/modules/Services/Hotels/HotelSidebar";
import { Mock_Data_Hotels as datas } from "@/public/assets/mockData/hotels";
import HotelCard from "@/components/common/HotelCard";

type Props = {};

const Hotels: FC<Props> = ({}) => {
  return (
    <MainLayout center>
      <div className={styles.container}>
        <HotelSidebar />
        <div className={styles.content}>
          {datas.map((item) => (
            <HotelCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default memo(Hotels);
