import { FC, memo, useCallback, useEffect, useState } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import TourSidebar from "@/modules/Services/Tours/TourSidebar";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import TourCard from "@/components/common/TourCard";
import { ITour } from "@/types/services/tour";
import { getAllTourApi } from "@/api/services/tour";

type Props = {};

const Tours: FC<Props> = ({}) => {
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
    <MainLayout center>
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

          <div>
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
