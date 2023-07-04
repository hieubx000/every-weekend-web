import { FC, memo, useCallback, useState, useEffect } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import { Collapse, Descriptions, Divider, Image, List, Button } from "antd";
import { HiOutlineTicket } from "react-icons/hi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import {
  convertEnumToProvince,
  convertEnumToVehicle,
  convertTimestampToDate,
  numberFormatter,
} from "@/utils/converts";
import { useRouter } from "next/router";
import { ITour } from "@/types/services/tour";
import { handleError } from "@/utils/helper";
import moment from "moment";
import { getTourBySlugApi } from "@/pages/api/services/tour";

const { Panel } = Collapse;

type Props = {};

const TourDetail: FC<Props> = ({}) => {
  const router = useRouter();
  const [tourDetail, setTourDetail] = useState<ITour>();

  const getData = useCallback(async () => {
    const slug = router.query.slug ? router.query.slug.toString() : "";

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
          priceBefore: response.data.data.priceBefore
        });
      } catch (error) {
        handleError(error);
      }
    }
  }, [router]);

  useEffect(() => {
    getData();
  }, [router]);

  const pushToBookingTour = useCallback(() => {
    router.push(`/services/tours/booking?tourId=${tourDetail?.slug}`);
  }, [router, tourDetail]);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.images}>
          <Image.PreviewGroup preview>
            <div className={styles.images_grid}>
              {tourDetail?.imageUrl.map((item, index) => (
                <Image
                  className={styles.images_grid_item}
                  key={index}
                  src={item}
                />
              ))}
            </div>
          </Image.PreviewGroup>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>
              <div className={styles.title_ticketCode}>
                <HiOutlineTicket size={20} />
                {tourDetail?.id}
              </div>
              <div className={styles.title_name}>{tourDetail?.title}</div>
              <div className={styles.title_evaluate}>
                <div className={styles.title_evaluate_rating}>
                  {tourDetail?.rate}5
                </div>
                <div className={styles.title_evaluate_comment}>Tuyệt vời</div>
                <div className={styles.title_evaluate_favoriteNumber}>
                  <MdOutlineFavoriteBorder />
                  132
                </div>
              </div>
              <div>
                Số chỗ còn lại &nbsp;
                {(tourDetail?.maxSlot || 0) - (tourDetail?.used || 0)}
              </div>
            </div>
            <div className={styles.priceAndBookTour}>
              <div>{numberFormatter(tourDetail?.price || 0)}đ</div>
              <div className={styles.price}>
                Giá từ
                <p>
                  {numberFormatter(
                    ((tourDetail?.price || 0) / 100) *
                      (100 - (tourDetail?.discount || 0)),
                  )}
                  đ
                </p>
              </div>
              <Button
                className="bold"
                type="primary"
                size="large"
                style={{ marginTop: "12px" }}
                onClick={pushToBookingTour}>
                Đặt ngay
              </Button>
            </div>
          </div>

          <Divider />

          <div className={styles.about}>
            <h2>Thông tin về chuyến đi</h2>
            <p>{tourDetail?.introduction}</p>
          </div>

          <Divider />

          <div className={styles.information}>
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
                Địa điểm tập trung:
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
                <b>{convertEnumToProvince(tourDetail?.fromDestination || 1)}</b>
              </div>
            </div>

            <div className={styles.information_items}>
              <div className={styles.information_items_item}>
                <div className={styles.information_items_item_header}>
                  <img
                    width={24}
                    src="/assets/icons/services/calendar.svg"
                    alt="calendar"
                  />
                  <p>Thời gian</p>
                </div>
                <div>
                  {tourDetail?.numOfDays} ngày,&nbsp;
                  {(tourDetail?.numOfDays || 0) > 1 &&
                    (tourDetail?.numOfDays || 0) - 1 + " đêm"}
                </div>
              </div>
              <div className={styles.information_items_item}>
                <div className={styles.information_items_item_header}>
                  <img
                    width={24}
                    src="/assets/icons/services/transportation.svg"
                    alt="transportation"
                  />
                  <p>Phương tiện di chuyển</p>
                </div>
                <div>
                  {tourDetail?.vehicle.map((item) => {
                    return convertEnumToVehicle(item) + ", ";
                  })}
                </div>
              </div>
              <div className={styles.information_items_item}>
                <div className={styles.information_items_item_header}>
                  <img
                    width={24}
                    src="/assets/icons/services/map.svg"
                    alt="map"
                  />
                  <p>Điểm tham quan</p>
                </div>
                <div>
                  {tourDetail?.sightseeing.map((item) => {
                    return item + ", ";
                  })}
                </div>
              </div>
              <div className={styles.information_items_item}>
                <div className={styles.information_items_item_header}>
                  <img
                    width={24}
                    src="/assets/icons/services/food.svg"
                    alt="food"
                  />
                  <p>Ẩm thực</p>
                </div>
                <div>mực, cá</div>
              </div>
              <div className={styles.information_items_item}>
                <div className={styles.information_items_item_header}>
                  <img
                    width={24}
                    src="/assets/icons/services/hotel.svg"
                    alt="hotel"
                  />
                  <p>Khách sạn</p>
                </div>
                <div>5 sao</div>
              </div>
              <div className={styles.information_items_item}>
                <div className={styles.information_items_item_header}>
                  <img
                    width={24}
                    src="/assets/icons/services/people.svg"
                    alt="people"
                  />
                  <p>Đối tượng thích hợp</p>
                </div>
                <div>Tất cả mọi người</div>
              </div>
            </div>
          </div>

          <Divider />

          <div className={styles.schedule}>
            <h2>Lịch trình</h2>
            <div>
              <Collapse defaultActiveKey={0} size="large">
                {tourDetail?.schedule.map((item, index) => (
                  <Panel header={`Ngày ${index + 1} ${item.label}`} key={index}>
                    <p>{item.content}</p>
                  </Panel>
                ))}
              </Collapse>
            </div>
          </div>

          <Divider />

          <div className={styles.tourGuide}>
            <Descriptions title="Thông tin hướng dẫn viên">
              <Descriptions.Item label="Tên HDV">
                <b>Bùi Xuân Hiếu</b>
              </Descriptions.Item>
              <Descriptions.Item label="Telephone">
                <b>+84 963626914</b>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <b>buixuanhieutn@gmail.com</b>
              </Descriptions.Item>
              <Descriptions.Item label="Kinh nghiệm dẫn đoàn">
                <b>5 năm</b>
              </Descriptions.Item>
              <Descriptions.Item label="Đơn vị công tác">
                <b>Tổng công ty du lịch Every Weekend</b>
              </Descriptions.Item>
            </Descriptions>
          </div>

          <Divider />

          <div className={styles.informationToNote}>
            <h2>Thông tin cần lưu ý</h2>
            <List
              size="small"
              bordered
              dataSource={[
                "Đặt tour trước tối thiểu 2 ngày so với ngày khởi hành (không tính ngày lễ, thứ 7 và chủ nhật)",
                "Phải gửi đầy đủ thông tin chính xác và đầy đủ về Họ tên + ngày tháng năm sinh",
                "Là người có quốc tịch Việt Nam",
                "Quý khách đi tour (đặc biệt là các tour liên quan đến tàu thủy, tàu hỏa, máy bay… hoặc các tour đi đến các vùng biên giới) phải mang theo giấy tờ tùy thân hợp pháp (CMND/Thẻ căn cước/Hộ chiếu). Trẻ dưới 14 tuổi tối thiểu phải mang theo giấy khai sinh. Trẻ em từ 14 tuổi trở lên bắt buộc phải có Thẻ căn cước hoặc hộ chiếu.",
                "Nên mang theo thuốc đau bụng do tiêu chảy, thuốc cảm sốt thông thường",
                "Quý khách là người ăn chay vui lòng mang thêm đồ ăn chay theo để đảm bảo khẩu vị của mình",
                "Bất cứ dịch vụ nào trong tour nếu Quý khách không sử dụng cũng không được hoàn lại",
                "Hướng dẫn viên có quyền sắp xếp lại thứ tự các điểm thăm quan cho phù hợp điều kiện từng ngày khởi hành cụ thể nhưng vẫn đảm bảo tất cả các điểm thăm quan trong chương trình.",
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default memo(TourDetail);
