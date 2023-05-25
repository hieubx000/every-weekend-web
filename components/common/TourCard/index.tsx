import { FC, memo } from "react";

import styles from "./style.module.scss";
import { ITour } from "@/types/services/tour";
import { convertTimestampToDate, numberFormatter } from "@/utils/converts";
import Link from "next/link";
import { routerPathConstant } from "@/constants/routerConstant";
import Button from "@/components/common/Button";
type Props = {
  data: ITour;
};

const TourCard: FC<Props> = ({ data }) => {
  return (
    <Link className={styles.container} href={routerPathConstant.tours + "/" + data.id}>
        <img src={data.bannerUrl} alt="" />
        <div className={styles.content}>
          <div className={styles.content_date}>
            {convertTimestampToDate(data.startTime)} - {data.dayTime} ngày
          </div>
          <div className={styles.content_name}>{data.name}</div>
          <div>Mã tour: {data.id}</div>
          <div>Nơi khởi hành: {data.departure}</div>
          <div className={styles.content_price}>
            Giá <p>{numberFormatter(data.price)}đ</p>
          </div>
          <div className={styles.content_priceNow}>
            <span>
              {numberFormatter((data.price / 100) * (100 - data.discount))}đ
            </span>
            <div className={styles.content_discount}>{data.discount}% giảm</div>
          </div>
          <div>Số chỗ còn {data.quantity}</div>
          <Button style={{margin: "12px 0"}} variant="full-width">
            Đặt ngay
          </Button>
        </div>
    </Link>
  );
};

export default memo(TourCard);
