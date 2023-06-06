import { FC, memo, useState, useCallback } from "react";
import { useRouter } from "next/router";

import { Mock_Data_Hotels } from "@/public/assets/mockData/hotels";
import {
  Affix,
  DatePicker,
  Divider,
  Form,
  Image,
  InputNumber,
  Rate,
  Button,
  Tooltip,
  Result,
} from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { BiBed, BiWifi2 } from "react-icons/bi";
import { GrUser } from "react-icons/gr";
import ModalPopup from "@/components/common/ModalPopup/ModalPopup";
import MainLayout from "@/components/layouts/MainLayout";
import { convertFacilitiesFromEnum } from "@/utils/facilities";
import { numberFormatter } from "@/utils/converts";
import { Room } from "@/types/services/hotels";

import styles from "./style.module.scss";

const { RangePicker } = DatePicker;

type Props = {};

const HotelDetail: FC<Props> = ({}) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const data = Mock_Data_Hotels[0];
  const [order, setOrder] = useState<Room>();
  const [imageUrls, setImageUrls] = useState(
    data.imageUrls.map((item, index) => {
      if (index < 5) return item;
    }),
  );

  const onFinish = useCallback(
    (e: any) => {
      setVisible(true);
    },
    [order],
  );

  const postToHomePage = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.images}>
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}>
            <div className={styles.images_grid}>
              {imageUrls.map((item, index) => (
                <Image
                  className={styles.images_grid_item}
                  key={index}
                  src={item}
                  onClick={() => {
                    // setImageUrls(data.imageUrls)
                  }}
                />
              ))}
            </div>
          </Image.PreviewGroup>
        </div>

        <div className={styles.content}>
          <div className={styles.content_left}>
            <Rate
              className={styles.content_left_rating}
              disabled
              defaultValue={data.rating ?? 0}
            />
            <div className={styles.content_left_title}>{data.name}</div>
            <div className={styles.content_left_address}>
              <HiOutlineLocationMarker />
              {data.address}
            </div>
            <Divider />
            <div>
              <h2>Giới thiệu về khách sạn</h2>
              <div>{data.about}</div>
            </div>
            <Divider />
            <div>
              <h2>Danh sách tiện nghi</h2>
              <div className={styles.content_left_facilities}>
                {data.facilities.map((item) => (
                  <div className={styles.content_left_facilities_item}>
                    {convertFacilitiesFromEnum(item)?.icon}
                    <div>{convertFacilitiesFromEnum(item)?.title}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2>Nội quy</h2>
              <div>
                {data.rule.checkIn}
                {data.rule.checkOut}
              </div>
            </div>

            <Divider />

            <div className={styles.content_left_availability}>
              <h2>Danh sách phòng</h2>
              <div className={styles.availabilities}>
                {data.availability.map((item, index) => (
                  <div key={index} className={styles.availability}>
                    <img src={item.imageUrl} alt="availability" />
                    <div className={styles.availability_content}>
                      <div className={styles.availability_content_info}>
                        <div className={styles.availability_content_info_title}>
                          {item.name}
                        </div>
                        <div className={styles.availability_content_info_items}>
                          <div
                            className={
                              styles.availability_content_info_items_item
                            }>
                            <div
                              className={
                                styles.availability_content_info_items_item_icon
                              }>
                              <TbArrowAutofitHeight size={24} />
                            </div>
                            <div
                              className={
                                styles.availability_content_info_items_item_title
                              }>
                              {item.acreage} m2
                            </div>
                          </div>
                          <div
                            className={
                              styles.availability_content_info_items_item
                            }>
                            <div
                              className={
                                styles.availability_content_info_items_item_icon
                              }>
                              <BiBed size={24} />
                            </div>
                            <div
                              className={
                                styles.availability_content_info_items_item_title
                              }>
                              x{item.noOfBeds}
                            </div>
                          </div>
                          <div
                            className={
                              styles.availability_content_info_items_item
                            }>
                            <div
                              className={
                                styles.availability_content_info_items_item_icon
                              }>
                              <GrUser size={24} />
                            </div>
                            <div
                              className={
                                styles.availability_content_info_items_item_title
                              }>
                              x{item.amount}
                            </div>
                          </div>
                          {item.wifi && (
                            <div
                              className={
                                styles.availability_content_info_items_item
                              }>
                              <div
                                className={
                                  styles.availability_content_info_items_item_icon
                                }>
                                <BiWifi2 size={24} />
                              </div>
                              <div
                                className={
                                  styles.availability_content_info_items_item_title
                                }>
                                Wifi
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={styles.availability_content_price}>
                        <div>
                          <p>Giá phòng/đêm</p>
                          <div
                            className={styles.availability_content_price_value}>
                            {numberFormatter(item.price)}
                            <p>đ</p>
                          </div>
                        </div>
                        <Button
                          type="primary"
                          onClick={() => {
                            setOrder(item);
                          }}>
                          Chọn ngay
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Affix offsetTop={80}>
            <div className={styles.content_right}>
              <Form
                onFinish={onFinish}
                initialValues={{
                  ["quantity"]: 1,
                  ["person"]: 2,
                }}>
                <Form.Item
                  label="Thời gian đặt phòng"
                  name="time"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thời gian đặt phòng",
                    },
                  ]}>
                  <RangePicker
                    size="large"
                    format="DD-MM-YYYY"
                    placeholder={["Check In", "Check Out"]}
                  />
                </Form.Item>

                <Form.Item
                  label="Số phòng"
                  name="quantity"
                  rules={[
                    { required: true, message: "Vui lòng nhập số phòng" },
                  ]}>
                  <InputNumber
                    size="large"
                    min={0}
                    max={20}
                    placeholder="Số phòng"
                  />
                </Form.Item>

                <Form.Item
                  label="Số Người"
                  name="person"
                  rules={[
                    { required: true, message: "Vui lòng nhập số người" },
                  ]}>
                  <InputNumber
                    size="large"
                    min={0}
                    max={40}
                    placeholder="Số người"
                  />
                </Form.Item>

                {order && (
                  <div className={styles.content_right_info}>
                    <div>
                      Loại phòng: <b>{order?.name}</b>
                    </div>
                    <div>
                      Đơn giá:{" "}
                      <b>{order?.price ? numberFormatter(order?.price) : 0}đ</b>
                    </div>
                    <div>
                      Diện tích: <b>{order?.acreage} m2</b>
                    </div>
                  </div>
                )}

                <Divider />
                <Tooltip title={order ? "" : "Vui lòng chọn phòng"}>
                  <Button
                    disabled={order ? false : true}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block>
                    Đặt phòng
                  </Button>
                </Tooltip>
              </Form>
            </div>
          </Affix>
        </div>
      </div>
      <ModalPopup
        width={700}
        visible={visible}
        isConfirmBtn={false}
        isCancelBtn={false}>
        <Result
          icon={<img width={200} src="/assets/icons/success.svg" alt="" />}
          status="success"
          title="Đặt phòng thành công"
          subTitle="Mã đặt phòng của bạn là: 123456789"
          extra={[
            <Button type="primary" key="console">
              Đi tới chi tiết
            </Button>,
            <Button onClick={postToHomePage}>Trở về trang chủ</Button>,
          ]}
        />
      </ModalPopup>
    </MainLayout>
  );
};

export default memo(HotelDetail);
