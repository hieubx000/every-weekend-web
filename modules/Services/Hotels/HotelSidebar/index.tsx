import {
  Dispatch,
  FC,
  SetStateAction,
  memo,
  useCallback,
  useState,
  useEffect,
} from "react";

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
import { handleError } from "@/utils/helper";
import { useRouter } from "next/router";
import { getAllDestinationApi } from "@/pages/api/services/destination";

type Props = {};

const HotelSideBar: FC<Props> = ({}) => {
  const router = useRouter();

  const onChangeSort = useCallback(
    (e: RadioChangeEvent) => {
      router.push({ query: { ...router.query, sort: e.target.value } });
    },
    [router],
  );

  const onChangeSliderPrice = useCallback(
    (e: [number, number]) => {
      router.push({
        query: {
          ...router.query,
          minPrice: e[0] * 2000000,
          maxPrice: e[1] * 2000000,
        },
      });
    },
    [router],
  );

  const [destinations, setDestinations] = useState([]);

  const getDestinationData = useCallback(async () => {
    try {
      const response = await getAllDestinationApi();
      const data: any = [];
      response.data.data.map((item: any) => {
        data.push({
          id: item._id,
          title: item.title,
        });
      });
      setDestinations(data);
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    getDestinationData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sort}>
        <div className={styles.sort_title}>Sắp xếp kết quả</div>
        <div className={styles.sort_desp}>Sắp xếp theo kết quả lựa chọn</div>
        <Radio.Group onChange={onChangeSort} value={router.query.sort || "1"}>
          <Space direction="vertical">
            <Radio value={"1"}>Giá cao nhất</Radio>
            <Radio value={"2"}>Giá thấp nhất</Radio>
            <Radio value={"3"}>Điểm đánh giá</Radio>
            <Radio value={"4"}>Độ phổ biến</Radio>
          </Space>
        </Radio.Group>
      </div>

      <div className={styles.filter}>
        <div className={styles.filter_title}>Bộ lọc kết quả</div>

        <div className={styles.filter_price}>
          <Slider
            range
            value={[
              router.query.minPrice
                ? parseInt(router.query.minPrice.toString()) / 2000000
                : 0,
              router.query.maxPrice
                ? parseInt(router.query.maxPrice.toString()) / 2000000
                : 100,
            ]}
            onChange={onChangeSliderPrice}
          />
          <div className={styles.filter_price_display}>
            <div className={styles.filter_price_display_item}>
              <div className={styles.filter_price_display_item_title}>
                Giá thấp nhất
              </div>
              <div className={styles.filter_price_display_item_value}>
                {numberFormatter(
                  router.query.minPrice
                    ? parseInt(router.query.minPrice.toString())
                    : 0,
                )}{" "}
                đ
              </div>
            </div>
            <div className={styles.filter_price_display_item}>
              <div className={styles.filter_price_display_item_title}>
                Giá cao nhất
              </div>
              <div className={styles.filter_price_display_item_value}>
                {numberFormatter(
                  router.query.maxPrice
                    ? parseInt(router.query.maxPrice.toString())
                    : 200000000,
                )}{" "}
                đ
              </div>
            </div>
          </div>
        </div>

        <div className={styles.filter_item}>
          <div className={styles.filter_item_title}>Điểm đến</div>
          <Select
            style={{ width: "100%" }}
            size="large"
            placeholder="Địa điểm du lịch"
            value={
              router.query.toDestination
                ? router.query.toDestination.toString()
                : undefined
            }
            onChange={(e) =>
              router.push({
                query: {
                  ...router.query,
                  toDestination: e,
                },
              })
            }
            allowClear>
            {destinations.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default memo(HotelSideBar);
