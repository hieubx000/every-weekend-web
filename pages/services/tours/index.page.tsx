import { FC, memo, useState } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import TourSidebar from "@/modules/Services/Tours/TourSidebar";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { Mock_Data_Tours } from "@/public/assets/mockData/tour";
import TourCard from "@/components/common/TourCard";

type Props = {};

const Tours: FC<Props> = ({}) => {
  const [tours] = useState(Mock_Data_Tours);

  return (
    <MainLayout>
      <div className={styles.container}>
        <TourSidebar />
        <div className={styles.content}>
          <div className={styles.header}>
            <div>0 kết quả được tìm thấy</div>
            <div>
              <CiGrid2H />
              <CiGrid41 />
            </div>
          </div>

          <div style={{display: "block"}}>
            <div className={styles.grid}>
              {tours.map((item, index) => (
                <TourCard key={index} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default memo(Tours);
