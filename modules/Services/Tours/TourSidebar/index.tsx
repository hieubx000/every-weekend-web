import { FC, memo, useCallback, useState } from "react";

import styles from "./style.module.scss";
import {
  DatePicker,
  Radio,
  RadioChangeEvent,
  Select,
  Slider,
  Space,
} from "antd";
import { numberFormatter } from "@/utils/converts";

type Props = {};

const TourSideBar: FC<Props> = ({}) => {
  const [sort, setSort] = useState(1);
  const [price, setPrice] = useState<[number, number]>([0, 100]);
  const onChangeSort = useCallback((e: RadioChangeEvent) => {
    setSort(e.target.value);
  }, []);

  const onChangeSliderPrice = useCallback((e: [number, number]) => {
    console.log("MTS2023", e);
    setPrice(e);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sort}>
        <div className={styles.sort_title}>Sắp xếp kết quả</div>
        <div className={styles.sort_desp}>Sắp xếp theo kết quả lựa chọn</div>
        <Radio.Group onChange={onChangeSort} value={sort}>
          <Space direction="vertical">
            <Radio value={1}>Giá cao nhất</Radio>
            <Radio value={2}>Giá thấp nhất</Radio>
            <Radio value={3}>Điểm đánh giá</Radio>
            <Radio value={4}>Độ phổ biến</Radio>
          </Space>
        </Radio.Group>
      </div>

      <div className={styles.filter}>
        <div className={styles.filter_title}>Bộ lọc kết quả</div>

        <div className={styles.filter_price}>
          <Slider range defaultValue={price} onChange={onChangeSliderPrice} />
          <div className={styles.filter_price_display}>
            <div className={styles.filter_price_display_item}>
              <div className={styles.filter_price_display_item_title}>
                Giá thấp nhất
              </div>
              <div className={styles.filter_price_display_item_value}>
                {numberFormatter(price[0] * 1000000)} đ
              </div>
            </div>
            <div className={styles.filter_price_display_item}>
              <div className={styles.filter_price_display_item_title}>
                Giá cao nhất
              </div>
              <div className={styles.filter_price_display_item_value}>
                {numberFormatter(price[1] * 1000000)} đ
              </div>
            </div>
          </div>
        </div>

        <div className={styles.filter_item}>
          <div className={styles.filter_item_title}>Ngày đi</div>
          <DatePicker placeholder="Chọn ngày đi" />
        </div>

        <div className={styles.filter_item}>
          <div className={styles.filter_item_title}>Số ngày</div>
          <div className={styles.filter_box}>
            <div className={styles.filter_box_item}>1 - 3 ngày</div>
            <div className={styles.filter_box_item}>4 - 7 ngày</div>
            <div className={styles.filter_box_item}>8 - 14 ngày</div>
            <div className={styles.filter_box_item}>trên 14 ngày</div>
          </div>
        </div>

        <div className={styles.filter_item}>
          <div className={styles.filter_item_title}>Điểm đi</div>
          <Select style={{ width: "100%" }} placeholder="Chọn điểm đi"></Select>
        </div>
        <div className={styles.filter_item}>
          <div className={styles.filter_item_title}>Điểm đến</div>
          <Select style={{ width: "100%" }} placeholder="Chọn điểm đến"></Select>
        </div>
      </div>
    </div>
  );
};

export default memo(TourSideBar);
