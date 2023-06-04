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
import SupplierLayout from "@/components/layouts/SupplierLayout";
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

const CreateTour: FC<Props> = ({}) => {
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
    breadcrumbItems,
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
    <SupplierLayout breadcrumbItems={breadcrumbItems}>
      <div className={styles.container}>
        <Form
          form={form}
          onFinish={() => {}}
          layout="vertical"
          scrollToFirstError>
          <Row gutter={28}>
            <Col span={16}>
              <Form.Item
                name="name"
                label="Tên tour"
                rules={[
                  {
                    required: true,
                    message: "Tên tour không được để trống!",
                  },
                ]}>
                <Input placeholder="Nhập tên tour của bạn" maxLength={200} />
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
            <Col span={8}>
              <Form.Item
                name="startTime"
                label="Ngày bắt đầu"
                rules={[
                  {
                    required: true,
                    message: "Ngày bắt đầu không được để trống!",
                  },
                ]}>
                <DatePicker placeholder="Chọn ngày" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="dayTime"
                label="Số ngày"
                rules={[
                  {
                    required: true,
                    message: "Số ngày không được để trống!",
                  },
                ]}>
                <InputNumber min={1} max={100} placeholder="Nhập số ngày" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="scale"
                label="Số lượng"
                rules={[
                  {
                    required: true,
                    message: "Số lượng du khách không được để trống!",
                  },
                ]}>
                <InputNumber
                  placeholder="Nhập số lượng du khách"
                  min={1}
                  max={100}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={28}>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Giá gốc"
                rules={[
                  {
                    required: true,
                    message: "Giá gốc không được để trống",
                  },
                ]}>
                <InputNumber
                  placeholder="Nhập giá gốc"
                  addonAfter="đ"
                  controls={false}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="discount" label="Tỉ lệ giảm giá">
                <InputNumber
                  placeholder="Nhập tỉ lệ giảm giá"
                  addonAfter="%"
                  min={1}
                  max={100}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="vehicle" label="Phương tiện di chuyển">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Chọn phương tiện di chuyển"
                  onChange={() => {}}
                  options={options}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={28}>
            <Col span={28} className={styles.sightseeing}>
              <Form.Item name="sightseeing" label="Địa điểm tham quan">
                <Space size={[0, 8]} wrap>
                  <Space size={[0, 8]} wrap>
                    {tags.map((tag, index) => {
                      if (editInputTagIndex === index) {
                        return (
                          <Input
                            ref={editInputTagRef}
                            key={tag}
                            size="small"
                            className={styles.sightseeing_tagInput}
                            value={editInputTagValue}
                            onChange={handleEditInputChange}
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
                          />
                        );
                      }
                      const isLongTag = tag.length > 20;
                      const tagElem = (
                        <Tag
                          key={tag}
                          color="geekblue"
                          closable={true}
                          className={styles.sightseeing_tag}
                          onClose={() => handleClose(tag)}>
                          <span
                            onDoubleClick={(e) => {
                              if (index !== 0) {
                                setEditInputTagIndex(index);
                                setEditInputTagValue(tag);
                                e.preventDefault();
                              }
                            }}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                          </span>
                        </Tag>
                      );
                      return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                          {tagElem}
                        </Tooltip>
                      ) : (
                        tagElem
                      );
                    })}
                  </Space>
                  {inputVisible ? (
                    <Input
                      ref={inputRef}
                      type="text"
                      size="small"
                      className={styles.sightseeing_tagInput}
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={handleInputConfirm}
                      onPressEnter={handleInputConfirm}
                    />
                  ) : (
                    <Tag
                      onClick={showInput}
                      className={styles.sightseeing_btnAdd}>
                      <PlusOutlined /> Thêm
                    </Tag>
                  )}
                </Space>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={28}>
            <Col span={16}>
              <Form.Item
                name="destination"
                label="Địa điểm du lịch"
                rules={[
                  {
                    required: true,
                    message: "Địa điểm du lịch không được để trống!",
                  },
                ]}>
                <Select placeholder="Địa điểm du lịch"></Select>
              </Form.Item>
            </Col>

            <Col span={8}>
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
            </Col>
          </Row>

          <Form.Item
            name="address"
            label="Địa điểm tập trung"
            rules={[
              {
                required: true,
                message: "Cần ít nhất 1 địa chỉ tập trung!",
              },
            ]}>
            {renderAddress}
          </Form.Item>

          {convetratePlace.length < 3 && (
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
                label="Video giới thiệu tour"
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

          <div className={styles.title}>Lịch trình chuyến đi</div>
          <Form.List name="sights">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div className={styles.schedule}>
                    <div className={styles.schedule_iconDelete}>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </div>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.area !== curValues.area ||
                        prevValues.sights !== curValues.sights
                      }>
                      {() => (
                        <Form.Item
                          {...field}
                          label={`Tên ngày ${index + 1}`}
                          name={[field.name, "label"]}>
                          <Input />
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Col span={28}>
                      <Form.Item
                        {...field}
                        label="Lịch trình cụ thể"
                        name={[field.name, "content"]}>
                        <Input.TextArea autoSize={{ minRows: 5 }} />
                      </Form.Item>
                    </Col>
                  </div>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}>
                    Thêm ngày
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <div className={styles.btnSubmit}>
            <Button>Trở lại</Button>
            <Button type="primary">Tạo mới</Button>
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
    </SupplierLayout>
  );
};

export default memo(CreateTour);
