import { FC, memo, useState, useMemo, useCallback, useEffect } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import { Mock_Data_Tours } from "@/public/assets/mockData/tour";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import {
  convertEnumToProvince,
  convertTimestampToDate,
  convertTimestampToDateTime,
  convertTimestampToDateTimeAdded,
  numberFormatter,
} from "@/utils/converts";
import {
  Affix,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Result,
  Row,
  Select,
  Steps,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import { FiUsers } from "react-icons/fi";
import { useRouter } from "next/router";
import SuccessModal from "@/components/common/Modal/SuccessModal";
import { handleError } from "@/utils/helper";
import { ITour } from "@/types/services/tour";
import { getTourBySlugApi } from "@/api/services/tour";
import { postCreateBookTourApi } from "@/api/services/booking-tour";

type Props = {};

const TourBooking: FC<Props> = ({}) => {
  const [visible, setVisible] = useState(false);
  const [customerCount, setCustomerCount] = useState(1);
  const router = useRouter();

  const [tourDetail, setTourDetail] = useState<ITour>();

  const getData = useCallback(async () => {
    const slug = router.query.tourId ? router.query.tourId.toString() : "";

    if (slug) {
      try {
        const response = await getTourBySlugApi(slug);

        setTourDetail({
          id: response.data.data._id,
          title: response.data.data.title,
          slug: response.data.data.slug,
          imageUrl: response.data.data.imageUrl,
          about: response.data.data.about,
          fromDate: response.data.data.fromDate,
          startTime: response.data.data.startTime,
          beforeStartTime: response.data.data.beforeStartTime,
          gatheringPlace: response.data.data.gatheringPlace,
          numOfDays: response.data.data.numOfDays,
          maxSlot: response.data.data.maxSlot,
          vehicle: response.data.data.vehicle,
          sightseeing: response.data.data.sightseeing,
          schedule: response.data.data.schedule,
          price: response.data.data.price,
          discount: response.data.data.discount,
          fromDestination: response.data.data.fromDestination,
          toDestination: response.data.data.toDestination,
          introduction: response.data.data.introduction,
          introLink: response.data.data.introLink,
          tourGuide: response.data.data.tourGuide,
        });
      } catch (error) {
        handleError(error);
      }
    }
  }, [router]);

  useEffect(() => {
    getData();
  }, [router]);

  const customers = useMemo(() => {
    const list = [];
    for (let i = 0; i < customerCount; i++) {
      list.push(i);
    }
    return list;
  }, [customerCount]);

  const onFinish = useCallback(
    async (values: any) => {
      if (tourDetail && tourDetail.id) {
        try {
          await postCreateBookTourApi({
            cName: values.cName,
            cEmail: values.cEmail,
            cPhone: values.cPhone,
            cAddress: values.cAddress,
            customer: values.customer.map((item: any) => {
              return {
                fullName: item.fullName,
                gender: item.gender,
                birthday: 0,
                cccd: item.cccd,
              };
            }),
            totalCustomer: values.totalCustomer || 1,
            note: values.note,
            tour: tourDetail.id,
          });
          setVisible(true);
        } catch (error) {
          handleError(error);
        }
      }
    },
    [tourDetail],
  );

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.enterInformation}>
          <div className={styles.information}>
            <img src={tourDetail?.imageUrl[0]} alt="" />
            <div>
              <div className={styles.information_evaluate}>
                <div className={styles.title_evaluate_rating}>9.5</div>
                <div className={styles.information_evaluate_comment}>
                  Tuyệt vời
                </div>
                <div className={styles.information_evaluate_favoriteNumber}>
                  <MdOutlineFavoriteBorder />
                  132
                </div>
              </div>
              <div className={styles.information_name}>{tourDetail?.title}</div>
              <div className={styles.information_card}>
                <div>
                  Khởi hành{" "}
                  <b>
                    {moment.unix(tourDetail?.startTime || 0).format("HH:mm")} -{" "}
                    {convertTimestampToDate(tourDetail?.fromDate || 0)}
                  </b>
                </div>
                <div>
                  Thời gian tập trung
                  <b>
                    {" "}
                    {moment
                      .unix(tourDetail?.beforeStartTime || 0)
                      .format("HH:mm")}{" "}
                    - {convertTimestampToDate(tourDetail?.fromDate || 0)}
                  </b>
                </div>
                <div>
                  Địa điểm tập trung{" "}
                  <b>
                    {tourDetail?.gatheringPlace.map((item, index) => {
                      return <li key={index}>{item.address}</li>;
                    })}
                  </b>
                </div>
                <div>
                  Thời gian <b>{tourDetail?.numOfDays} ngày</b>
                </div>
                <div>
                  Nơi khởi hành{" "}
                  <b>
                    {convertEnumToProvince(tourDetail?.fromDestination || 1)}
                  </b>
                </div>
              </div>
            </div>
          </div>

          <h1>Tổng quan về chuyến đi</h1>

          <Form className={styles.content} onFinish={onFinish}>
            <div className={styles.form}>
              <div className={styles.communications}>
                <h2>Thông tin liên lạc</h2>
                <Row gutter={28}>
                  <Col span={12}>
                    <Form.Item
                      name="cName"
                      label="Họ và tên"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ tên",
                        },
                      ]}>
                      <Input size="large" placeholder="Nhập họ tên" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      name="cEmail"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập Email",
                        },
                      ]}>
                      <Input size="large" placeholder="Nhập email" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={28}>
                  <Col span={12}>
                    <Form.Item
                      name="cPhone"
                      label="Số điện thoại"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại",
                        },
                      ]}>
                      <InputNumber
                        size="large"
                        controls={false}
                        placeholder="Nhập số điện thoại"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Địa chỉ" name="cAddress">
                      <Input size="large" placeholder="Nhập địa chỉ" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <div className={styles.communications}>
                <h2>Thông tin khách hàng</h2>
                <Form.Item
                  label="Số lượng khách hàng"
                  name="totalCustomer"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số lượng hành khách",
                    },
                  ]}>
                  <InputNumber
                    size="large"
                    controls={false}
                    min={1}
                    max={10}
                    placeholder="Số lượng hành khách"
                    onChange={(e) => setCustomerCount(e || 1)}
                  />
                </Form.Item>

                {customers.map((item) => (
                  <Row gutter={28}>
                    <Col span={8}>
                      <Form.Item
                        label={`Họ tên khách hàng ${item + 1}`}
                        name={["customer", item, "fullName"]}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên khách hàng",
                          },
                        ]}>
                        <Input placeholder="Họ tên" size="large" />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        label="Giới tính"
                        name={["customer", item, "gender"]}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập giới tính",
                          },
                        ]}>
                        <Select size="large" placeholder="Giới tính">
                          <Select.Option value={1}>Nam</Select.Option>
                          <Select.Option value={2}>Nữ</Select.Option>
                          <Select.Option value={0}>Khác</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        label="Ngày sinh"
                        name={["customer", item, "birthDay"]}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập ngày sinh",
                          },
                        ]}>
                        <DatePicker
                          disabledDate={(now) => now && now > moment()}
                          size="large"
                          placeholder="Ngày sinh"
                          format="MM-YYYY"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Số định danh cá nhân (nếu có)"
                        name={["customer", item, "cccd"]}>
                        <InputNumber
                          size="large"
                          controls={false}
                          placeholder="Số định danh cá nhân"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </div>
              <div className={styles.communications}>
                <h2>Thông tin bổ sung</h2>
                <Form.Item label="Ghi chú" name="note">
                  <Input.TextArea rows={4} placeholder="Thêm ghi chú" />
                </Form.Item>
              </div>
            </div>

            <Affix offsetTop={80}>
              <div className={styles.summary}>
                <h2>Tóm tắt chuyến đi</h2>
                <div className={styles.summary_title}>
                  <img src={tourDetail?.imageUrl[0]} width={100} alt="" />
                  <h4>{tourDetail?.title}</h4>
                </div>
                <Steps
                  direction="vertical"
                  size="small"
                  current={1}
                  items={[
                    {
                      icon: <CalendarOutlined />,
                      title: "Bắt đầu chuyến đi",
                      description: (
                        <div className={styles.summary_step}>
                          {moment
                            .unix(tourDetail?.startTime || 0)
                            .format("HH:mm")}{" "}
                          - {convertTimestampToDate(tourDetail?.fromDate || 0)}
                        </div>
                      ),
                    },
                    {
                      icon: <CalendarOutlined />,
                      title: "Kết thúc chuyến đi",
                      // TODO: handle end date
                      description: (
                        <div className={styles.summary_step}>
                          {moment
                            .unix(tourDetail?.startTime || 0)
                            .format("HH:mm")}{" "}
                          - {convertTimestampToDate(tourDetail?.fromDate || 0)}
                        </div>
                      ),
                    },
                  ]}
                />

                <div className={styles.summary_item}>
                  <h3>Hành khách</h3>
                  <div className={styles.summary_item_value}>
                    <h2>{customerCount}</h2> <FiUsers size={24} />
                  </div>
                </div>

                <div className={styles.summary_item}>
                  <div>Đơn giá</div>
                  <div className={styles.summary_item_value}>
                    {customerCount} x {numberFormatter(tourDetail?.price || 0)}đ
                  </div>
                </div>

                <div className={styles.summary_item}>
                  <div>Giảm giá</div>
                  <div className={styles.summary_item_value}>
                    {tourDetail?.discount} %
                  </div>
                </div>

                <Divider className={styles.divider} />

                <div className={styles.summary_price}>
                  <h3>Tổng cộng</h3>
                  <div>
                    {numberFormatter(
                      customerCount *
                        (tourDetail?.price || 0) *
                        ((100 - (tourDetail?.discount || 0)) / 100),
                    )}
                    đ
                  </div>
                </div>
                <Button
                  htmlType="submit"
                  className="bold"
                  type="primary"
                  size="large"
                  block>
                  Đặt ngay
                </Button>
              </div>
            </Affix>
          </Form>
          <SuccessModal
            onCancel={() => setVisible(false)}
            visible={visible}
            title="Đặt tour thành công"
            subTitle="Mã đặt tour của bạn là: 123456789"
            goToDetailUrl="/"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default memo(TourBooking);
