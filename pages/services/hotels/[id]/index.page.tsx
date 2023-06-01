import { FC, memo, useState } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import { Mock_Data_Hotels } from "@/public/assets/mockData/hotels";
import {
  Affix,
  DatePicker,
  Divider,
  Form,
  Image,
  InputNumber,
  Rate,
} from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { BiBed, BiWifi2 } from "react-icons/bi";
import { GrUser } from "react-icons/gr";
import { convertFacilitiesFromEnum } from "@/utils/facilities";
import { numberFormatter } from "@/utils/converts";
import Button from "@/components/common/Button";
const { RangePicker } = DatePicker;

type Props = {};

const HotelDetail: FC<Props> = ({}) => {
  const data = Mock_Data_Hotels[0];
  const [imageUrls, setImageUrls] = useState(
    data.imageUrls.map((item, index) => {
      if (index < 5) return item;
    }),
  );
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
                          <span>
                            {numberFormatter(item.price)}
                            <p>đ</p>
                          </span>
                        </div>
                        <Button>Đặt phòng</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.content_right}>
            <Form>
              <Form.Item
                label="Thời gian đặt phòng"
                name="time"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thời gian đặt phòng",
                  },
                ]}>
                <RangePicker />
              </Form.Item>

              <Form.Item
                label="Số phòng"
                name="quantity"
                rules={[{ required: true, message: "Vui lòng nhập số phòng" }]}>
                <InputNumber min={0} max={20} defaultValue={1} />
              </Form.Item>

              <Form.Item
                label="Số Người"
                name="person"
                rules={[{ required: true, message: "Vui lòng nhập số người" }]}>
                <InputNumber min={0} max={40} defaultValue={2} />
              </Form.Item>
            </Form>
            <Button>Đặt phòng</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default memo(HotelDetail);
