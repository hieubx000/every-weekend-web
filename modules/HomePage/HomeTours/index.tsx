import { FC, memo, useState } from "react";

import styles from "./style.module.scss";
import { ITour } from "@/types/services/tour";
import TourCard from "@/components/common/TourCard";
import { Mock_Data_Tours } from "@/public/assets/mockData/tour";

type Props = {};



const HomeTours: FC<Props> = ({}) => {
  const [tours] = useState(Mock_Data_Tours)

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

export default memo(HomeTours);
