import { FC, memo, useCallback, useState } from "react";

import styles from "./style.module.scss";
import { DatePicker, Radio, RadioChangeEvent, Select, Slider, Space } from "antd";
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
        <div>Sắp xếp kết quả</div>
        <div>Sắp xếp theo kết quả lựa chọn</div>
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
        <div>Bộ lọc kết quả</div>

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

        <div>
          <div>Điểm đi</div>
          <Select style={{ width: "100%" }}></Select>
        </div>
        <div>
          <div>Điểm đến</div>
          <Select style={{ width: "100%" }}></Select>
        </div>
        <div>
          <div>Số ngày</div>
          <div>
            <div>1-3 ngày</div>
            <div>4-7 ngày</div>
            <div>8-14 ngày</div>
            <div>trên 14 ngày</div>
          </div>
        </div>

        <div>
            <div>Ngày đi</div>
            <DatePicker/>
        </div>
      </div>
    </div>
  );
};

export default memo(TourSideBar);
