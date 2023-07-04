import { FC, memo } from "react";

import styles from "./style.module.scss";
import { ITour } from "@/types/services/tour";
import {
  convertEnumToProvince,
  convertTimestampToDate,
  numberFormatter,
} from "@/utils/converts";
import Link from "next/link";
import { routerPathConstant } from "@/constants/routerConstant";
import Button from "@/components/common/Button";
type Props = {
  data: ITour;
};

const TourCard: FC<Props> = ({ data }) => {
  return (
    <Link
      className={styles.container}
      href={routerPathConstant.tours + "/" + data.slug}>
      <img src={data.imageUrl?.[0]} alt="" />
      <div className={styles.content}>
        <div>
          <div className={styles.content_date}>
            {convertTimestampToDate(data.fromDate)} - {data.numOfDays} ngày
          </div>
          <div className={styles.content_name}>{data.title}</div>
        </div>
        <div>
          <div>
            Nơi khởi hành: <b>{convertEnumToProvince(data.fromDestination)}</b>
          </div>
          <div className={styles.content_price}>
            Giá: <b>{numberFormatter(data.price)}đ</b>
          </div>
          <div className={styles.content_priceNow}>
            <span>
              {numberFormatter((data.price / 100) * (100 - data.discount))}đ
            </span>
            <div className={styles.content_discount}>{data.discount}% giảm</div>
          </div>
          <div>
            Số chỗ còn: <b>{data.maxSlot - (data.used || 0)}</b>
          </div>
          <Button style={{ margin: "12px 0" }} variant="full-width">
            Đặt ngay
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default memo(TourCard);
