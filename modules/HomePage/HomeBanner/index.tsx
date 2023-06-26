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
import { provinceList } from "@/public/assets/data/intData";
import { getAllDestinationApi } from "@/api/services/destination";
import { handleError } from "@/utils/helper";
import { BiSearch } from "react-icons/bi";
import { SearchOutlined } from "@ant-design/icons";

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
          <Form className={styles.tabs__children__form} name="basic">
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
                <Select.Option value="All">Tất cả</Select.Option>
                <Select.Option value="1">1-3 ngày</Select.Option>
                <Select.Option value="2">3-5 ngày</Select.Option>
                <Select.Option value="3">1 tuần</Select.Option>
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
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            // style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              className={styles.tabs__children__form__item}
              name="diemDi"
              rules={[{ required: true, message: "" }]}>
              <Select
                placeholder="Chọn điểm đến"
                allowClear
                showSearch
                // filterOption={filterSelectOption}
              >
                <Select.Option value="Hanoi">Hà Nội</Select.Option>
                <Select.Option value="Thainguyen">Thái Nguyên</Select.Option>
              </Select>
            </Form.Item>
            <img src="/assets/icons/two-way.svg" width={24} alt="" />
            <Form.Item
              className={styles.tabs__children__form__item}
              name="diemDen"
              rules={[{ required: true, message: "" }]}>
              <Select
                placeholder="Chọn điểm đến"
                allowClear
                showSearch
                // filterOption={filterSelectOption}
              >
                <Select.Option value="Hanoi">Hà Nội</Select.Option>
                <Select.Option value="Thainguyen">Thái Nguyên</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="startDate"
              className={styles.tabs__children__form__item}
              rules={[{ required: true, message: "" }]}>
              <DatePicker format={dateFormat} />
            </Form.Item>

            <Form.Item
              className={styles.tabs__children__form__item}
              name="soNgay"
              rules={[{ required: true, message: "" }]}>
              <Select
                placeholder="Chọn số ngày"
                allowClear
                showSearch
                // filterOption={filterSelectOption}
              >
                <Select.Option value="All">Tất cả</Select.Option>
                <Select.Option value="1">1-3 ngày</Select.Option>
                <Select.Option value="2">3-5 ngày</Select.Option>
                <Select.Option value="3">1 tuần</Select.Option>
              </Select>
            </Form.Item>

            <div className={styles.tabs__children__form__searchBtn}>
              <img src="/assets/icons/search.svg" width={20} alt="" />
              Tìm kiếm
            </div>
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
      children: <div className={styles.tabs__children}>Vé máy bay</div>,
    },
    {
      key: "4",
      label: (
        <div className={styles.tabs__label}>
          <TbReportSearch size={24} />
          <div>Tra cứu booking</div>
        </div>
      ),
      children: <div className={styles.tabs__children}>Tra cứu booking</div>,
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
