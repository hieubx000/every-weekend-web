import { FC, memo, useState, useCallback, useEffect } from "react";
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
import MainLayout from "@/components/layouts/MainLayout";
import { convertFacilitiesFromEnum } from "@/utils/facilities";
import {
  convertDatePickerToTimestamp,
  numberFormatter,
} from "@/utils/converts";
import { IHotel, Room } from "@/types/services/hotels";

import styles from "./style.module.scss";
import SuccessModal from "@/components/common/Modal/SuccessModal";
import { handleError } from "@/utils/helper";
import { getHotelBySlugApi } from "@/api/services/hotel";
import ErrorPage from "@/components/common/ErrorPage";
import { postCreateBookHotelApi } from "@/api/services/booking-hotel";

const { RangePicker } = DatePicker;

type Props = {};

const HotelDetail: FC<Props> = ({}) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState<Room>();

  const [hotelDetail, setHotelDetail] = useState<IHotel>();

  const getData = useCallback(async () => {
    const slug = router.query.slug ? router.query.slug.toString() : undefined;

    if (slug) {
      try {
        const response = await getHotelBySlugApi(slug);

        setHotelDetail({
          id: response.data.data._id,
          title: response.data.data.title,
          slug: response.data.data.slug,
          imageUrl: response.data.data.imageUrl,
          address: response.data.data.address,
          hotelService: response.data.data.hotelService,
          introduction: response.data.data.introduction,
          introLink: response.data.data.introLink,
          toDestination: response.data.data.toDestination,
          availability: response.data.data.availability,
        });
      } catch (error) {
        handleError(error);
      }
    }
  }, [router]);

  useEffect(() => {
    getData();
  }, [router]);

  const onFinish = useCallback(
    async (values: any) => {
      if (hotelDetail && hotelDetail.id) {
        try {
          await postCreateBookHotelApi({
            checkIn: convertDatePickerToTimestamp(values.time[0]),
            checkOut: convertDatePickerToTimestamp(values.time[1]),
            totalCustomer: values.totalCustomer,
            totalRoom: values.totalRoom,
            totalPrice: 2,
            hotel: hotelDetail.id,
          });
          setVisible(true)
        } catch (error) {
          handleError(error);
        }
      }
    },
    [order, hotelDetail],
  );

  return (
    <MainLayout>
      {hotelDetail ? (
        <div className={styles.container}>
          <div className={styles.images}>
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}>
              <div className={styles.images_grid}>
                {hotelDetail?.imageUrl.map((item, index) => (
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
                defaultValue={5}
              />
              <div className={styles.content_left_title}>
                {hotelDetail?.title}
              </div>
              <div className={styles.content_left_address}>
                <HiOutlineLocationMarker />
                {hotelDetail?.address[0].address}
              </div>
              <Divider />
              <div>
                <h2>Giới thiệu về khách sạn</h2>
                <div>{hotelDetail?.introduction}</div>
              </div>
              <Divider />
              <div>
                <h2>Danh sách tiện nghi</h2>
                <div className={styles.content_left_facilities}>
                  {hotelDetail?.hotelService.map((item, index) => (
                    <div
                      className={styles.content_left_facilities_item}
                      key={index}>
                      {convertFacilitiesFromEnum(item)?.icon}
                      <div>{convertFacilitiesFromEnum(item)?.title}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2>Nội quy</h2>
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td width={200}>Check In</td>
                        <td>12:AM</td>
                      </tr>
                      <tr>
                        <td>Check Out</td>
                        <td>12:AM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <Divider />

              <div className={styles.content_left_availability}>
                <h2>Danh sách phòng</h2>
                <div className={styles.availabilities}>
                  {hotelDetail?.availability.map((item, index) => (
                    <div key={index} className={styles.availability}>
                      <img
                        src="https://modtel.travelerwp.com/wp-content/uploads/2022/04/Jumeirah-Emirates-Towers-800x600.png"
                        alt="availability"
                      />
                      <div className={styles.availability_content}>
                        <div className={styles.availability_content_info}>
                          <div
                            className={styles.availability_content_info_title}>
                            {item.title}
                          </div>
                          <div
                            className={styles.availability_content_info_items}>
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
                          </div>
                        </div>
                        <div className={styles.availability_content_price}>
                          <div>
                            <p>Giá phòng/đêm</p>
                            <div
                              className={
                                styles.availability_content_price_value
                              }>
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
                    ["totalRoom"]: 1,
                    ["totalCustomer"]: 2,
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
                    name="totalRoom"
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
                    name="totalCustomer"
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
                        Loại phòng: <b>{order?.title}</b>
                      </div>
                      <div>
                        Đơn giá:{" "}
                        <b>
                          {order?.price ? numberFormatter(order?.price) : 0}đ
                        </b>
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
      ) : (
        <ErrorPage />
      )}

      <SuccessModal
        onCancel={() => setVisible(false)}
        visible={visible}
        title="Đặt phòng thành công"
        subTitle="Mã phòng tour của bạn là: 123456789"
        goToDetailUrl="/"
      />
    </MainLayout>
  );
};

export default memo(HotelDetail);
