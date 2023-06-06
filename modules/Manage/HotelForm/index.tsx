import { FC, memo } from "react";

import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Button,
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
import { getEmbedLinkYoutube, matchYoutubeUrl } from "@/utils/helper";
import { useManageTourForm } from "@/hooks/manage/useManageTourForm";

import styles from "./style.module.scss";

type Props = {};

const HotelForm: FC<Props> = ({}) => {
  const {
    isAddAddressModal,
    setIsAddAddressModal,
    pictureCertificate,
    setPictureCertificate,
    handleAddPictureCertificate,
    convetratePlace,
    form,
    handlePostAddress,
    options,
    tags,
    editInputTagIndex,
    setEditInputTagIndex,
    editInputTagRef,
    editInputTagValue,
    handleClose,
    handleEditInputChange,
    handleEditInputConfirm,
    inputRef,
    inputVisible,
    setEditInputTagValue,
    showInput,
    handleInputChange,
    handleInputConfirm,
    inputValue,
    renderAddress,
  } = useManageTourForm();

  return (
    <div className={styles.container}>
      <Form
        form={form}
        onFinish={(values) => {
          console.log("MTS2023", values);
        }}
        layout="vertical"
        scrollToFirstError>
        <Row gutter={28}>
          <Col span={16}>
            <Form.Item
              name="name"
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
            <Form.Item name="shortName" label="Tên viết tắt">
              <Input placeholder="Tên viết tắt" maxLength={200} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={28}>
          <Col span={8}>
            <Form.Item name="phoneNumber" label="Số điện thoại">
              <InputNumber
                placeholder="Nhập số điện thoại liên hệ"
                controls={false}
                maxLength={200}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "Phải là định dạng email!",
                },
              ]}>
              <Input placeholder="Nhập email liên hệ" maxLength={200} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="website" label="Website">
              <Input placeholder="Nhập website" maxLength={200} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={28}>
          <Col span={16}>
            <Form.Item
              name="destination"
              label="Địa điểm du lịch"
              rules={
                [
                  // {
                  //   required: true,
                  //   message: "Địa điểm du lịch không được để trống!",
                  // },
                ]
              }>
              <Select placeholder="Địa điểm du lịch"></Select>
            </Form.Item>
          </Col>

          {/* <Col span={8}>
            <Form.Item
              name="departure"
              label="Nơi khởi hành"
              rules={[
                {
                  required: true,
                  message: "Nơi khởi hành không được để trống!",
                },
              ]}>
              <Select placeholder="Nơi khởi hành">
                {(provinceList || []).map((province) => (
                  <Select.Option key={province.id} value={province.id}>
                    {province.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col> */}
        </Row>

        <Form.Item
          name="address"
          label="Vị trí"
          rules={[
            {
              required: true,
              message: "Vị trí không được để trống!",
            },
          ]}>
          {renderAddress}
        </Form.Item>

        {convetratePlace.length < 1 && (
          <button
            type="button"
            className={styles.address_btn}
            onClick={() => setIsAddAddressModal(true)}>
            <span>Thêm địa chỉ</span>
          </button>
        )}

        <div className={styles.title}>Hình ảnh giới thiệu</div>

        <div className={styles.picture}>
          {[
            "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/banner_halong.jpg?alt=media&token=ea5d21e9-cc50-4ea6-a4d7-1c0119cd3944&_gl=1*q29o7c*_ga*MjMxNjM4MDE1LjE2ODMwOTkwMDU.*_ga_CW55HF8NVT*MTY4NTgxMDI4NC42LjEuMTY4NTgxMDMwNy4wLjAuMA..",
            "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/banner_halong.jpg?alt=media&token=ea5d21e9-cc50-4ea6-a4d7-1c0119cd3944&_gl=1*q29o7c*_ga*MjMxNjM4MDE1LjE2ODMwOTkwMDU.*_ga_CW55HF8NVT*MTY4NTgxMDI4NC42LjEuMTY4NTgxMDMwNy4wLjAuMA..",
          ].map((picture, idx) => (
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
        <Form.List name="sights">
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
                            name={[field.name, "label"]}>
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
                        name={[field.name, "service"]}
                        label="Dịch vụ cung cấp">
                        <Select
                          mode="multiple"
                          allowClear
                          placeholder="Chọn dịch vụ cung cấp"
                          onChange={() => {}}
                          options={options}
                        />
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
          <Button>Trở lại</Button>
          <Button type="primary" htmlType="submit">
            Tạo mới
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
