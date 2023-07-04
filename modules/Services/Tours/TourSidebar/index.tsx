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
import {
  convertDatePickerToEndDateTimestamp,
  convertDatePickerToTimestamp,
  numberFormatter,
} from "@/utils/converts";
import { dateFormat } from "@/utils/patterns";
import classNames from "classnames";
import { provinceList } from "@/public/assets/data/intData";
import { getAllDestinationApi } from "@/api/services/destination";
import { handleError } from "@/utils/helper";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import moment from "moment";

type Props = {
  setFromDate: Dispatch<SetStateAction<number | undefined>>;
  setNumOfDayFilter: Dispatch<SetStateAction<NumOfDays | undefined>>;
  numOfDayFilter: NumOfDays | undefined;
};

export type NumOfDays = {
  id: string;
  title: string;
  params: {
    minNumOfDay: number;
    maxNumOfDay?: number;
  };
};

export const numOfDayList: NumOfDays[] = [
  {
    id: "1",
    title: "1 - 3 ngày",
    params: {
      minNumOfDay: 1,
      maxNumOfDay: 3,
    },
  },
  {
    id: "2",
    title: "4 - 7 ngày",
    params: {
      minNumOfDay: 4,
      maxNumOfDay: 7,
    },
  },
  {
    id: "3",
    title: "8 - 14 ngày",
    params: {
      minNumOfDay: 8,
      maxNumOfDay: 14,
    },
  },
  {
    id: "4",
    title: "trên 14 ngày",
    params: {
      minNumOfDay: 15,
    },
  },
];

const TourSideBar: FC<Props> = ({
  setFromDate,
  numOfDayFilter,
  setNumOfDayFilter,
}) => {
  const router = useRouter();

  const onChangeSort = useCallback(
    (e: RadioChangeEvent) => {
      router.push({
        query: {
          ...router.query,
          sort: e.target.value,
        },
      });
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
          <div className={styles.filter_item_title}>Ngày đi</div>
          <DatePicker
            size="large"
            format={dateFormat}
            value={
              router.query.fromDate
                ? dayjs(
                    moment
                      .unix(
                        router.query.fromDate
                          ? parseInt(router.query.fromDate.toString())
                          : 0,
                      )
                      .format(dateFormat),
                    dateFormat,
                  )
                : undefined
            }
            onChange={(e) => {
              router.push({
                query: {
                  ...router.query,
                  fromDate: e
                    ? convertDatePickerToEndDateTimestamp(e)
                    : undefined,
                },
              });
            }}
            placeholder="Chọn ngày đi"
          />
        </div>

        <div className={styles.filter_item}>
          <div className={styles.filter_item_title}>Số ngày</div>
          <div className={styles.filter_box}>
            {numOfDayList.map((item) => (
              <div
                key={item.id}
                className={classNames(styles.filter_box_item, {
                  [styles.filter_box_item_active]:
                    router.query.numOfDayFilter &&
                    item.id === router.query.numOfDayFilter,
                })}
                onClick={() => {
                  if (
                    router.query.numOfDayFilter &&
                    item.id === router.query.numOfDayFilter
                  ) {
                    // setNumOfDayFilter(undefined);
                    router.push({
                      query: {
                        ...router.query,
                        numOfDayFilter: undefined,
                      },
                    });
                  } else
                    router.push({
                      query: {
                        ...router.query,
                        numOfDayFilter: item.id,
                      },
                    });
                }}>
                {item.title}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filter_item}>
          <div className={styles.filter_item_title}>Nơi khởi hành</div>
          <Select
            style={{ width: "100%" }}
            size="large"
            placeholder="Nơi khởi hành"
            value={
              router.query.fromDestination
                ? parseInt(router.query.fromDestination.toString())
                : undefined
            }
            onChange={(e) =>
              router.push({
                query: {
                  ...router.query,
                  fromDestination: e,
                },
              })
            }
            allowClear>
            {(provinceList || []).map((province) => (
              <Select.Option key={province.id} value={province.id}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
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

export default memo(TourSideBar);
