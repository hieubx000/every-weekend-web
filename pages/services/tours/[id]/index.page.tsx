import { FC, memo, useMemo, useState } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import { Collapse, Descriptions, Divider, Image, List } from "antd";
import { Mock_Data_Tours } from "@/public/assets/mockData/tour";
import { HiOutlineTicket } from "react-icons/hi";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import {
  convertTimestampToDate,
  convertTimestampToDateTime,
  numberFormatter,
} from "@/utils/converts";
import Button from "@/components/common/Button";
const { Panel } = Collapse;

type Props = {};

const TourDetail: FC<Props> = ({}) => {
  const data = Mock_Data_Tours[0];
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
          <div className={styles.header}>
            <div className={styles.title}>
              <div className={styles.title_ticketCode}>
                <HiOutlineTicket />
                {data.id}
              </div>
              <div className={styles.title_name}>{data.name}</div>
              <div className={styles.title_evaluate}>
                <div className={styles.title_evaluate_rating}>
                  {data.rating}
                </div>
                <div className={styles.title_evaluate_comment}>Tuyệt vời</div>
                <div className={styles.title_evaluate_favoriteNumber}>
                  <MdOutlineFavoriteBorder />
                  {data.favoriteNumber}
                </div>
              </div>
              <div>Số chỗ còn lại {data.quantity}</div>
            </div>
            <div className={styles.priceAndBookTour}>
              <div>{numberFormatter(data.price)}đ</div>
              <div className={styles.price}>
                Giá từ
                <p>
                  {numberFormatter((data.price / 100) * (100 - data.discount))}đ
                </p>
              </div>
              <Button style={{ marginTop: "12px" }}>Đặt ngay</Button>
            </div>
          </div>

          <Divider />

          <div className={styles.about}>
            <h2>Thông tin về chuyến đi</h2>
            <p>{data.description}</p>
          </div>

          <Divider />

          <div className={styles.information}>
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
                  {data.dayTime} ngày,
                  {data.dayTime > 1 && data.dayTime - 1 + "đêm"}
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
                <div>{data.vehicle}</div>
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
                <div>{data.sightseeing}</div>
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
                <div>{data.cuisine}</div>
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
                <div>{data.hotelId}</div>
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
                <div>{data.suitablePerson}</div>
              </div>
            </div>
          </div>

          <Divider />

          <div className={styles.schedule}>
            <h2>Lịch trình</h2>
            <div>
              <Collapse defaultActiveKey={0} size="large">
                {data.schedule.map((item, index) => (
                  <Panel header={`Ngày ${index + 1} ${item.title}`} key={index}>
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
