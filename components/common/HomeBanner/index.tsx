import { FC, memo, useCallback } from "react";

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
    bannerUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/banner.png?alt=media&token=c56c3a87-99cc-4236-8522-26ba31b984e6",
  },
  {
    id: "2",
    bannerUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/stock-vector-travel-banner-design-with-famous-landmarks-for-popular-travel-blog-landing-page-or-tourism-website-1386268178.jpg?alt=media&token=f1666ae1-b7e4-43a3-918c-17c3ba379ca7",
  },
  {
    id: "3",
    bannerUrl:
      "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/34925939-travel-banner-flat-vector-illustration.webp?alt=media&token=f622bc6a-2d7b-4ce1-ae8b-55fa2a4a1c2c",
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

  const tabs: Tab[] = [
    {
      key: "1",
      label: (
        <div className={styles.tabs__label}>
          <img src="/assets/icons/tourism.svg" width={24} alt="" />
          <div>Tour du lịch</div>
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
      key: "2",
      label: (
        <div className={styles.tabs__label}>
          <img src="/assets/icons/hotel.svg" width={24} alt="" />
          <div>Khách sạn</div>
        </div>
      ),
      children: <div className={styles.tabs__children}>
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
    </div>,
    },
    {
      key: "3",
      label: (
        <div className={styles.tabs__label}>
          <img src="/assets/icons/airplane.svg" width={24} alt="" />
          <div>Vé máy bay</div>
        </div>
      ),
      children: <div className={styles.tabs__children}>Vé máy bay</div>,
    },
    {
      key: "4",
      label: (
        <div className={styles.tabs__label}>
          <img src="/assets/icons/search.svg" width={24} alt="" />
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
