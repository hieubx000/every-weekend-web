import { FC, memo } from "react";

import styles from "./style.module.scss";
import { ITour } from "@/types/services/tour";
import { convertTimeToDate, numberFormatter } from "@/utils/converts";
import Link from "next/link";
import { routerPathConstant } from "@/constants/routerConstant";

type Props = {
  data: ITour;
};

const TourCard: FC<Props> = ({ data }) => {
  return (
    <Link href={routerPathConstant.tours + "/" + data.id}>
      <div className={styles.container}>
        <img src={data.bannerUrl} alt="" />
        <div className={styles.content}>
          <div>
            {convertTimeToDate(data.startTime)} - {data.dayTime}
          </div>
          <div>{data.name}</div>
          <div>Mã tour: {data.id}</div>
          <div>Nơi khởi hành: {data.departure}</div>
          <div>Giá {numberFormatter(data.price)}</div>
          <div>
            {numberFormatter((data.price / 100) * (100 - data.discount))}
          </div>
          <div>Số chỗ còn {data.quantity}</div>
        </div>
      </div>
    </Link>
  );
};

export default memo(TourCard);
