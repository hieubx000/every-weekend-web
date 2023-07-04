import { FC, memo, useCallback, useState, useEffect } from "react";

import styles from "./style.module.scss";
import Slider from "react-slick";
import {
  Form,
  Col,
  Row,
  Input,
  Select,
  Tabs,
  Checkbox,
  Button,
  DatePicker,
} from "antd";
import { MdOutlineAirplaneTicket, MdTravelExplore } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { airportList, provinceList } from "@/public/assets/data/intData";
import { handleError } from "@/utils/helper";
import { BiSearch } from "react-icons/bi";
import { SearchOutlined } from "@ant-design/icons";
import { numOfDayList } from "@/modules/Services/Tours/TourSidebar";
import { useRouter } from "next/router";
import {
  convertDatePickerToEndDate,
  convertDatePickerToEndDateTimestamp,
} from "@/utils/converts";
import dayjs from "dayjs";
import { getAllDestinationApi } from "@/pages/api/services/destination";

type Props = {};

const sliderSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  swipeToSlide: true,
  speed: 1000,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        // slidesToScroll: 2,
        slidesPerRow: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        // slidesToScroll: 1,
        slidesPerRow: 1,
        // dots: false
      },
    },
  ],
};

const homeBanners = [
  {
    id: "1",
    bannerUrl: "/assets/images/banner/banner_1.png",
  },
  {
    id: "2",
    bannerUrl: "/assets/images/banner/banner_2.png",
  },
];

type Tab = {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
};

const HomeBanner: FC<Props> = ({}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onSearch = useCallback(() => {}, []);

  const dateFormat = "DD-MM-YYYY";
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

  const tabs: Tab[] = [
    {
      key: "1",
      label: (
        <div className={styles.tabs__label}>
          <MdTravelExplore size={24} />
          <div>Tour du lịch</div>
        </div>
      ),
      children: (
        <div className={styles.tabs__children}>
          <Form
            className={styles.tabs__children__form}
            name="basic"
            onFinish={(e) => {
              const queryString: any = {};
              if (e.fromDestination) {
                queryString.fromDestination = e.fromDestination;
              }
              if (e.toDestination) {
                queryString.toDestination = e.toDestination;
              }
              if (e.fromDate) {
                queryString.fromDate = convertDatePickerToEndDateTimestamp(
                  e.fromDate,
                );
              }
              if (e.numOfDays) {
                queryString.numOfDayFilter = e.numOfDays;
              }

              router.push({
                pathname: "/services/tours",
                query: { ...queryString },
              });
            }}>
            <Form.Item
              className={styles.tabs__children__form__item}
              name="fromDestination">
              <Select placeholder="Chọn điểm đi" allowClear size="large">
                {(provinceList || []).map((province) => (
                  <Select.Option key={province.id} value={province.id}>
                    {province.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <img src="/assets/icons/two-way.svg" width={24} alt="" />

            <Form.Item
              className={styles.tabs__children__form__item}
              name="toDestination">
              <Select placeholder="Chọn điểm đến" allowClear size="large">
                {destinations.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="fromDate"
              className={styles.tabs__children__form__item}>
              <DatePicker
                size="large"
                format={dateFormat}
                placeholder="Chọn ngày bắt đầu"
              />
            </Form.Item>

            <Form.Item
              className={styles.tabs__children__form__item}
              name="numOfDays">
              <Select placeholder="Chọn số ngày" allowClear size="large">
                {numOfDayList.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
              shape="round"
              icon={<SearchOutlined />}
              size="large">
              Tìm kiếm
            </Button>
          </Form>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className={styles.tabs__label}>
          <FaHotel size={24} />
          <div>Khách sạn</div>
        </div>
      ),
      children: (
        <div className={styles.tabs__children}>
          <Form
            className={styles.tabs__children__form}
            name="basic"
            onFinish={(e) => {
              const queryString: any = {};
              if (e.toDestination) {
                queryString.toDestination = e.toDestination;
              }

              router.push({
                pathname: "/services/hotels",
                query: { ...queryString },
              });
            }}>
            <Form.Item
              className={styles.tabs__children__form__item}
              style={{ width: "100%", marginRight: "32px" }}
              name="toDestination">
              <Select placeholder="Chọn điểm đến" allowClear size="large">
                {destinations.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
              shape="round"
              icon={<SearchOutlined />}
              size="large">
              Tìm kiếm
            </Button>
          </Form>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className={styles.tabs__label}>
          <MdOutlineAirplaneTicket size={24} />
          <div>Vé máy bay</div>
        </div>
      ),
      children: (
        <div className={styles.tabs__children}>
          <Form
            name="basic"
            onFinish={(e) => {
              router.push(
                `https://www.traveloka.com/vi-vn/flight/fullsearch?ap=${
                  e.fromDestination
                }.${e.toDestination}&dt=${convertDatePickerToEndDate(
                  e.fromDate,
                )}.NA&ps=${e.count}.0.0&sc=${e.seatClass}`,
              );
            }}
            initialValues={{
              fromDestination: airportList[0].nickname,
              toDestination: airportList[1].nickname,
              count: 1,
              fromDate: dayjs("15-07-2023", dateFormat),
              seatClass: "ECONOMY",
            }}
            style={{ display: "grid", gap: "24px" }}>
            <div className={styles.tabs__children__form}>
              <Form.Item
                label="Từ"
                className={styles.tabs__children__form__item}
                name="fromDestination"
                style={{ width: "30%" }}>
                <Select size="large">
                  {(airportList || []).map((item) => (
                    <Select.Option key={item.id} value={item.nickname}>
                      {item.name} ({item.nickname})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <img src="/assets/icons/two-way.svg" width={24} alt="" />

              <Form.Item
                label="Đến"
                className={styles.tabs__children__form__item}
                name="toDestination"
                style={{ width: "30%" }}>
                <Select size="large">
                  {(airportList || []).map((item) => (
                    <Select.Option key={item.id} value={item.nickname}>
                      {item.name} ({item.nickname})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Số hành khách"
                className={styles.tabs__children__form__item}
                style={{ width: "30%" }}
                name="count">
                <Select size="large">
                  {[1, 2, 3, 4].map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className={styles.tabs__children__form}>
              <Form.Item
                label="Ngày đi"
                name="fromDate"
                className={styles.tabs__children__form__item}
                style={{ width: "30%" }}>
                <DatePicker
                  size="large"
                  format={dateFormat}
                  placeholder="Chọn ngày đi"
                />
              </Form.Item>

              <Form.Item
                label="Hạng ghế"
                className={styles.tabs__children__form__item}
                name="seatClass"
                style={{ width: "30%" }}>
                <Select size="large">
                  <Select.Option value="ECONOMY">Phổ Thông</Select.Option>
                  <Select.Option value="PREMIUM_ECONOMY">
                    Phổ Thông Đặc Biệt
                  </Select.Option>
                  <Select.Option value="BUSINESS">Thương Gia</Select.Option>
                  <Select.Option value="FIRST">Hạng Nhất</Select.Option>
                </Select>
              </Form.Item>
              <Button
                style={{ width: "25.5%", marginTop: "30px" }}
                htmlType="submit"
                type="primary"
                shape="round"
                icon={<SearchOutlined />}
                size="large">
                Tìm kiếm
              </Button>
            </div>
          </Form>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className={styles.tabs__label}>
          <TbReportSearch size={24} />
          <div>Tra cứu booking</div>
        </div>
      ),
      children: (
        <div className={styles.tabs__children}>Dịch vụ hiện tại chưa có</div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={`${styles.banner_wrap}`}>
        <div className={styles.banner_wrap__img}>
          {homeBanners.length ? (
            <Slider {...sliderSettings}>
              {homeBanners.map((item) => (
                <div key={item.id}>
                  <div className="cursor-pointer" rel="noreferrer">
                    <img
                      alt=""
                      src={item.bannerUrl}
                      height={512}
                      className="object-fit-cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            //TODO: thay doi banner mac dinh
            <img alt="" src="/assets/images/homepage/banner/banner_small.jpg" />
          )}
        </div>
        <div className={`${styles.banner_search}`}>
          <div className={styles.inner}>
            <Tabs defaultActiveKey="1" type="card" size="large" items={tabs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomeBanner);
