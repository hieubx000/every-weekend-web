import { FC, memo } from "react";

import styles from "./style.module.scss";
import { IHotel } from "@/types/services/hotels";
import { Rate } from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Button from "../Button";
import { useRouter } from "next/router";
import { numberFormatter } from "@/utils/converts";
import Link from "next/link";

type Props = {
  data: IHotel;
};

const HotelCard: FC<Props> = ({ data }) => {
  const router = useRouter();
  return (
    <Link href={`/services/hotels/${data.slug}`}>
      <div className={styles.container}>
        <img src={data.imageUrl[0]} alt="" />
        <div className={styles.content}>
          <div className={styles.content_title}>{data.title}</div>
          <div className={styles.content_rating}>
            <Rate disabled defaultValue={data.rating ?? 0} />
          </div>
          <div className={styles.content_address}>
            <HiOutlineLocationMarker size={24} />
            <p>{data.address[0].address}</p>
          </div>
          <div className={styles.content_booking}>
            <div className={styles.content_booking_price}>
              Giá mỗi đêm <p>{numberFormatter(data.availability[0].price)}đ</p>
            </div>
            <Button>Đặt ngay</Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(HotelCard);
