import { FC, memo, useCallback, useEffect } from "react";

import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Button,
  message,
} from "antd";
import ModalPopup from "@/components/common/ModalPopup/ModalPopup";
import Map from "@/components/common/Map/Map";
import { provinceList } from "@/public/assets/data/intData";
import {
  CloseCircleFilled,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import UploadMultiPicture from "@/components/common/UploadMultiPicture/UploadMultiPicture";
import {
  getEmbedLinkYoutube,
  handleError,
  matchYoutubeUrl,
} from "@/utils/helper";
import { useManageTourForm } from "@/hooks/manage/useManageTourForm";

import styles from "./style.module.scss";
import { useManageHotelForm } from "@/hooks/manage/useManageHotelForm";
import { hotelServiceList } from "@/utils/initData";
import { patchUpdateHotelApi, postCreateHotelApi } from "@/api/services/hotel";
import { IHotel } from "@/types/services/hotels";
import { useRouter } from "next/router";

type Props = {
  hotelDetail?: IHotel;
};

const HotelForm: FC<Props> = ({ hotelDetail }) => {
  const router = useRouter();
  const {
    isAddAddressModal,
    setIsAddAddressModal,
    pictureCertificate,
    setPictureCertificate,
    handleAddPictureCertificate,
    form,
    handlePostAddress,
    gatheringPlace,
    renderAddress,
    destinations,
    setGatheringPlace,
  } = useManageHotelForm();

  useEffect(() => {
    if (hotelDetail) {
      form.setFieldsValue({
        title: hotelDetail.title,
        slug: hotelDetail.slug,
        toDestination: hotelDetail.toDestination,
        hotelService: hotelDetail.hotelService,
        introduction: hotelDetail.introduction,
        introLink: hotelDetail.introLink,
        availability: hotelDetail.availability,
      });
      setPictureCertificate(hotelDetail.imageUrl);
      setGatheringPlace(hotelDetail.address);
    }
  }, [hotelDetail, form]);

  const onFinish = useCallback(
    async (values: any) => {
      try {
        hotelDetail
          ? await patchUpdateHotelApi(hotelDetail.id || "", {
              title: values.title,
              imageUrl: pictureCertificate,
              toDestination: values.toDestination,
              address: gatheringPlace,
              introduction: values.introduction,
              introLink: values.introLink,
              hotelService: values.hotelService,
              availability: values.availability,
            })
          : await postCreateHotelApi({
              title: values.title,
              imageUrl: pictureCertificate,
              toDestination: values.toDestination,
              address: gatheringPlace,
              introduction: values.introduction,
              introLink: values.introLink,
              hotelService: values.hotelService,
              availability: values.availability,
            });
        router.back();
        message.success("Tạo khách sạn thành công!");
      } catch (error) {
        handleError(error);
      }
    },
    [pictureCertificate, gatheringPlace, hotelDetail],
  );

  return (
    <div className={styles.container}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError>
        <Row gutter={28}>
          <Col span={16}>
            <Form.Item
              name="title"
              label="Tên Khách sạn"
              rules={[
                {
                  required: true,
                  message: "Tên khách sạn không được để trống!",
                },
              ]}>
              <Input placeholder="Nhập tên khách sạn của bạn" maxLength={200} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="slug" label="Tên viết tắt">
              <Input disabled placeholder="Tên viết tắt" maxLength={200} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={28}>
          <Col span={16}>
            <Form.Item
              name="toDestination"
              label="Địa điểm du lịch"
              rules={[
                {
                  required: true,
                  message: "Địa điểm du lịch không được để trống!",
                },
              ]}>
              <Select placeholder="Địa điểm du lịch">
                {destinations.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="hotelService"
          label="Danh sách tiện nghi"
          rules={[
            {
              required: true,
              message: "Danh sách tiện nghi không được để trống!",
            },
          ]}>
          <Select placeholder="Danh sách tiện nghi" mode="multiple" allowClear>
            {hotelServiceList.map((item: any) => (
              <Select.Option key={item.value} value={item.value}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="address"
          label="Vị trí"
          >
          {renderAddress}
        </Form.Item>

        {gatheringPlace.length < 1 && (
          <button
            type="button"
            className={styles.address_btn}
            onClick={() => setIsAddAddressModal(true)}>
            <span>Thêm địa chỉ</span>
          </button>
        )}

        <div className={styles.title}>Hình ảnh giới thiệu</div>

        <div className={styles.picture}>
          {pictureCertificate.map((picture, idx) => (
            <div key={idx} className={styles.pic}>
              <img alt="" src={picture} />
              <div
                className={styles.cancel}
                onClick={() => {
                  setPictureCertificate(
                    pictureCertificate.filter((pic, id) => id !== idx),
                  );
                }}>
                <CloseCircleFilled className={styles.icon} />
              </div>
            </div>
          ))}
          {pictureCertificate.length < 5 && (
            <UploadMultiPicture setPicture={handleAddPictureCertificate} />
          )}
        </div>

        <Row gutter={28}>
          <Col span={24}>
            <Form.Item
              name="introduction"
              label="Giới thiệu"
              rules={[
                {
                  required: true,
                  message: "Trường giới thiệu không được để trống!",
                },
                {
                  max: 4000,
                  message: "Bạn không được nhập quá 4000 ký tự!",
                },
              ]}>
              <Input.TextArea autoSize={{ minRows: 4 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={28}>
          <Col span={24}>
            <Form.Item
              name="introLink"
              label="Video giới thiệu khách sạn"
              rules={[
                {
                  max: 1000,
                  message: "Bạn không được nhập quá 1000 ký tự!",
                },
              ]}>
              <Input
                placeholder="Nhập link video của youtube"
                maxLength={200}
              />
            </Form.Item>
          </Col>
          <Col span={24} className="mb-4">
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) => (
                <>
                  {getFieldValue("introLink") &&
                    matchYoutubeUrl(getFieldValue("introLink")) && (
                      <iframe
                        width="100%"
                        height="500"
                        src={getEmbedLinkYoutube(getFieldValue("introLink"))}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                </>
              )}
            </Form.Item>
          </Col>
        </Row>

        <div className={styles.title}>Các loại phòng cung cấp</div>
        <Form.List name="availability">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div className={styles.schedule}>
                  <div className={styles.schedule_iconDelete}>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </div>
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.area !== curValues.area ||
                          prevValues.sights !== curValues.sights
                        }>
                        {() => (
                          <Form.Item
                            {...field}
                            label={`Tên phòng ${index + 1}`}
                            name={[field.name, "title"]}>
                            <Input />
                          </Form.Item>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={28}>
                    <Col span={8}>
                      <Form.Item
                        {...field}
                        name={[field.name, "acreage"]}
                        label="Diện tích">
                        <InputNumber
                          placeholder="Nhập diện tích phòng"
                          controls={false}
                          maxLength={200}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        {...field}
                        name={[field.name, "noOfBeds"]}
                        label="Số giường">
                        <InputNumber
                          placeholder="Nhập số giường"
                          controls={false}
                          maxLength={200}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        {...field}
                        name={[field.name, "amount"]}
                        label="Số người tối đa">
                        <InputNumber
                          placeholder="Nhập số người tối đa"
                          controls={false}
                          maxLength={200}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={28}>
                    <Col span={16}>
                      <Form.Item
                        {...field}
                        name={[field.name, "price"]}
                        label="Giá phòng cho 1 đêm">
                        <InputNumber
                          placeholder="Nhập giá phòng"
                          controls={false}
                          maxLength={200}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        {...field}
                        name={[field.name, "quantity"]}
                        label="Số lượng phòng">
                        <InputNumber
                          placeholder="Nhập số lượng phòng"
                          controls={false}
                          maxLength={200}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={28}>
                    <Col span={24}>
                      <Form.Item
                        {...field}
                        name={[field.name, "roomService"]}
                        label="Dịch vụ cung cấp">
                        {/* <Select
                          mode="multiple"
                          allowClear
                          placeholder="Chọn dịch vụ cung cấp"
                          onChange={() => {}}
                          options={options}
                        /> */}
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}>
                  Thêm lựa chọn
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <div className={styles.btnSubmit}>
          <Button onClick={() => router.back()}>Trở lại</Button>
          <Button type="primary" htmlType="submit">
            {hotelDetail ? "Cập nhật" : "Tạo mới"}
          </Button>
        </div>
      </Form>
      <ModalPopup
        visible={isAddAddressModal}
        width={800}
        title="Thêm địa chỉ"
        isConfirmBtn={false}
        isCancelBtn={false}
        closeBtn
        handleCancelModal={() => setIsAddAddressModal(false)}>
        <Map
          handlePostAddress={handlePostAddress}
          handleCloseModalMap={() => setIsAddAddressModal(false)}
        />
      </ModalPopup>
    </div>
  );
};

export default memo(HotelForm);
