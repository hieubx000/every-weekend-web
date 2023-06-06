import { FC, memo, useState, useMemo, useCallback } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import { Mock_Data_Tours } from "@/public/assets/mockData/tour";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import {
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
import {
  CalendarOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { FiUsers } from "react-icons/fi";
import ModalPopup from "@/components/common/ModalPopup/ModalPopup";
import { useRouter } from "next/router";

type Props = {};

const TourBooking: FC<Props> = ({}) => {
  const [visible, setVisible] = useState(false);
  const [customerCount, setCustomerCount] = useState(1);
  const data = Mock_Data_Tours[0];
  const router = useRouter();

  const customers = useMemo(() => {
    const list = [];
    for (let i = 0; i < customerCount; i++) {
      list.push(i);
    }
    return list;
  }, [customerCount]);

  const onFinish = useCallback(() => {
    setVisible(true);
  }, []);

  const postToHomePage = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.enterInformation}>
          <div className={styles.information}>
            <img src={data.bannerUrl} width={350} alt="" />
            <div>
              <div className={styles.information_evaluate}>
                <div className={styles.title_evaluate_rating}>
                  {data.rating}
                </div>
                <div className={styles.information_evaluate_comment}>
                  Tuyệt vời
                </div>
                <div className={styles.information_evaluate_favoriteNumber}>
                  <MdOutlineFavoriteBorder />
                  {data.favoriteNumber}
                </div>
              </div>
              <div className={styles.information_name}>{data.name}</div>
              <div className={styles.information_card}>
                <div>
                  Khởi hành <b>{convertTimestampToDateTime(data.startTime)}</b>
                </div>
                <div>
                  Thời gian tập trung
                  <b> {convertTimestampToDateTime(data.concentrationTime)}</b>
                </div>
                <div>
                  Địa điểm tập trung <b>{data.convetratePlace}</b>
                </div>
                <div>
                  Thời gian <b>{data.dayTime} ngày</b>
                </div>
                <div>
                  Nơi khởi hành <b>{data.departure}</b>
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
                      name="name"
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
                      name="email"
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
                      name="phoneNumber"
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
                    <Form.Item label="Địa chỉ" name="address">
                      <Input size="large" placeholder="Nhập địa chỉ" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <div className={styles.communications}>
                <h2>Thông tin khách hàng</h2>
                <Form.Item
                  label="Số lượng khách hàng"
                  name="scale"
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
                        name={["customer", item, "name"]}
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
                        name={["customer", item, "birthday"]}
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
                        name={["customer", item, "personalNumber"]}>
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
                  <img src={data.bannerUrl} width={100} alt="" />
                  <h4>{data.name}</h4>
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
                          {convertTimestampToDateTime(data.startTime)}
                        </div>
                      ),
                    },
                    {
                      icon: <CalendarOutlined />,
                      title: "Kết thúc chuyến đi",
                      description: (
                        <div className={styles.summary_step}>
                          {convertTimestampToDateTimeAdded(
                            data.startTime,
                            data.dayTime,
                          )}
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
                    {customerCount} x {numberFormatter(data.price)}đ
                  </div>
                </div>

                <div className={styles.summary_item}>
                  <div>Giảm giá</div>
                  <div className={styles.summary_item_value}>
                    {data.discount} %
                  </div>
                </div>

                <Divider className={styles.divider} />

                <div className={styles.summary_price}>
                  <h3>Tổng cộng</h3>
                  <div>
                    {numberFormatter(
                      customerCount * data.price * ((100 - 15) / 100),
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
          <ModalPopup
            width={700}
            visible={visible}
            isConfirmBtn={false}
            isCancelBtn={false}>
            <Result
              icon={<img width={200} src="/assets/icons/success.svg" alt="" />}
              status="success"
              title="Đặt tour thành công"
              subTitle="Mã đặt tour của bạn là: 123456789"
              extra={[
                <Button type="primary" key="console">
                  Đi tới chi tiết
                </Button>,
                <Button onClick={postToHomePage}>Trở về trang chủ</Button>,
              ]}
            />
          </ModalPopup>
        </div>
      </div>
    </MainLayout>
  );
};

export default memo(TourBooking);
