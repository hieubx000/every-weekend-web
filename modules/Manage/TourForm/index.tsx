import { FC, memo, useCallback, useEffect, useState } from "react";

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
  message,
  TimePicker,
  SelectProps,
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
import { patchUpdateTourApi, postCreateTourApi } from "@/api/services/tour";
import { ITour } from "@/types/services/tour";
import dayjs from "dayjs";
import moment from "moment";
import { dateFormat } from "@/utils/patterns";
import { convertDatePickerToEndDateTimestamp, convertDatePickerToTimestamp } from "@/utils/converts";
import { useRouter } from "next/router";
import { vehicleList } from "@/utils/initData";
import { Destination } from "@/types/common";
import { getAllDestinationApi } from "@/api/services/destination";

type Props = {
  tourDetail?: ITour;
};

const TourForm: FC<Props> = ({ tourDetail }) => {
  const router = useRouter();
  const {
    isAddAddressModal,
    setIsAddAddressModal,
    pictureCertificate,
    setPictureCertificate,
    handleAddPictureCertificate,
    gatheringPlace,
    setGatheringPlace,
    form,
    handlePostAddress,
    tags,
    setTags,
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

  const [destinations, setDestinations] = useState([]);

  const getDestinationData = useCallback(async () => {
    try {
      const response = await getAllDestinationApi();
      const data: any = [];
      response.data.data.map((item: any) => {
        data.push({
          id: item._id,
          title: item.title,
        });
      });
      setDestinations(data);
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    getDestinationData();
  }, []);

  useEffect(() => {
    if (tourDetail) {
      form.setFieldsValue({
        title: tourDetail.title,
        slug: tourDetail.slug,
        fromDate: dayjs(
          moment.unix(tourDetail.fromDate).format(dateFormat),
          dateFormat,
        ),
        beforeStartTime: dayjs(
          moment.unix(tourDetail.beforeStartTime).format("HH:mm:ss"),
          "HH:mm:ss",
        ),
        startTime: dayjs(
          moment.unix(tourDetail.startTime).format("HH:mm:ss"),
          "HH:mm:ss",
        ),
        numOfDays: tourDetail.numOfDays,
        maxSlot: tourDetail.maxSlot,
        price: tourDetail.price,
        discount: tourDetail.discount,
        vehicle: tourDetail.vehicle,
        fromDestination: tourDetail.fromDestination,
        toDestination: tourDetail.toDestination,
        introduction: tourDetail.introduction,
        introLink: tourDetail.introLink,
        schedule: tourDetail.schedule,
      });
      setPictureCertificate(tourDetail.imageUrl);
      setGatheringPlace(tourDetail.gatheringPlace);
      setTags(tourDetail.sightseeing);
    }
  }, [tourDetail, form]);

  const onFinish = useCallback(
    async (values: any) => {
      try {
        tourDetail
          ? await patchUpdateTourApi(tourDetail.id || "", {
              title: values.title,
              imageUrl: pictureCertificate,
              about: values.about,
              fromDate: convertDatePickerToEndDateTimestamp(values.fromDate),
              startTime: convertDatePickerToTimestamp(values.startTime),
              beforeStartTime: convertDatePickerToTimestamp(
                values.beforeStartTime,
              ),
              gatheringPlace: gatheringPlace,
              numOfDays: values.numOfDays,
              maxSlot: values.maxSlot,
              vehicle: values.vehicle,
              sightseeing: tags,
              schedule: values.schedule,
              price: values.price,
              discount: values.discount,
              fromDestination: values.fromDestination,
              toDestination: values.toDestination,
              introduction: values.introduction,
              introLink: values.introLink,
              tourGuide: "",
              priceBefore: (values.price / 100) * (100 - values.discount)
            })
          : await postCreateTourApi({
              title: values.title,
              imageUrl: pictureCertificate,
              about: values.about,
              fromDate: convertDatePickerToEndDateTimestamp(values.fromDate),
              startTime: convertDatePickerToTimestamp(values.startTime),
              beforeStartTime: convertDatePickerToTimestamp(
                values.beforeStartTime,
              ),
              gatheringPlace: gatheringPlace,
              numOfDays: values.numOfDays,
              maxSlot: values.maxSlot,
              vehicle: values.vehicle,
              sightseeing: tags,
              schedule: values.schedule,
              price: values.price,
              discount: values.discount,
              fromDestination: values.fromDestination,
              toDestination: values.toDestination,
              introduction: values.introduction,
              introLink: values.introLink,
              tourGuide: "",
              priceBefore: (values.price / 100) * (100 - values.discount)
            });
        router.back();
        message.success("Đăng tour thành công");
      } catch (error) {
        message.error("Đăng tour thất bại");
      }
    },
    [pictureCertificate, gatheringPlace, tags, tourDetail],
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
            <Form.Item name="slug" label="Tên viết tắt">
              <Input disabled placeholder="Tên viết tắt" maxLength={200} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={28}>
          <Col span={8}>
            <Form.Item
              name="fromDate"
              label="Ngày bắt đầu"
              rules={[
                {
                  required: true,
                  message: "Ngày bắt đầu không được để trống!",
                },
              ]}>
              <DatePicker format={dateFormat} placeholder="Chọn ngày" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="numOfDays"
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
              name="maxSlot"
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
                options={vehicleList}
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
              name="toDestination"
              label="Địa điểm du lịch"
              rules={
                [
                  {
                    required: true,
                    message: "Địa điểm du lịch không được để trống!",
                  },
                ]
              }>
              <Select placeholder="Địa điểm du lịch">
                {destinations.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="fromDestination"
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

        <Row gutter={28}>
          <Col span={8}>
            <Form.Item
              name="beforeStartTime"
              label="Thời gian tập trung"
              rules={[
                {
                  required: true,
                  message: "Thời gian tập trung không được để trống!",
                },
              ]}>
              <TimePicker placeholder="Chọn giờ" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="startTime"
              label="Thời gian di chuyển"
              rules={[
                {
                  required: true,
                  message: "Thời gian di chuyển không được để trống!",
                },
              ]}>
              <TimePicker placeholder="Chọn giờ" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="gatheringPlace"
          label="Địa điểm tập trung"
          // rules={[
          //   {
          //     required: true,
          //     message: "Cần ít nhất 1 địa chỉ tập trung!",
          //   },
          // ]}
        >
          {renderAddress}
        </Form.Item>

        {gatheringPlace.length < 3 && (
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
        <Form.List name="schedule">
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
          <Button onClick={() => router.back()}>Trở lại</Button>
          <Button type="primary" htmlType="submit">
            {tourDetail ? "Cập nhật" : "Tạo mới"}
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

export default memo(TourForm);
