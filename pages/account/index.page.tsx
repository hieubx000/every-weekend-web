import { FC, memo, useState, useEffect, useCallback } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd";
import UploadAvatar from "@/components/common/UploadAvatar/UploadAvatar";
import { useRouter } from "next/router";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import { provinceList } from "@/public/assets/data/intData";
import { User } from "@/types/common";
import { authStorage } from "@/storage/authStorage";
import { dateFormat } from "@/utils/patterns";
import dayjs from "dayjs";
import { handleError } from "@/utils/helper";
import { convertDatePickerToTimestamp } from "@/utils/converts";
import SuccessModal from "@/components/common/Modal/SuccessModal";
import useUserProfile from "@/hooks/useUserProfile";
import { patchUpdateProfileApi } from "../api/services/auth";

type Props = {};

interface IRewardDiamond {
  name: string;
  diamond: number;
}

const Account: FC<Props> = ({}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { userProfile, userRole, userToken } = useUserProfile();

  useEffect(() => {
    if (userProfile) {
      setImageUrl(userProfile?.avatar);
      form.setFieldsValue({
        name: userProfile.name,
        birthday: dayjs(
          moment.unix(userProfile.birthday).format(dateFormat),
          dateFormat,
        ),
        address: userProfile.address,
        phoneNumber: userProfile.phoneNumber,
        email: userProfile.email,
      });
    }
  }, [userProfile, form]);

  const onFinish = useCallback(
    async (values: any) => {
      try {
        if (userProfile) {
          const response = await patchUpdateProfileApi(userProfile?.id, {
            avatar: imageUrl,
            name: values.name,
            birthday: convertDatePickerToTimestamp(values.birthday),
            address: values.address,
            phoneNumber: values.phoneNumber,
            email: values.email,
          });
          authStorage.setUserProfile({
            role: userRole,
            token: userToken,
            profile: response.data.data,
          });
        }
        setModalVisible(true);
      } catch (error) {
        handleError(error);
      }
    },
    [authStorage, userProfile, userRole, userToken, imageUrl],
  );

  const renderActionBtn = () => (
    <div className={styles.account_action}>
      <button type="submit">Lưu</button>
    </div>
  );

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.account}>
          <div className={styles.account_wrap}>
            <div className={styles.account_title}>Thông tin tài khoản</div>
            <Form
              form={form}
              //   initialValues={valueForm}
              onFinish={onFinish}
              className={styles.account_form}>
              <Row className="my-5">
                <div className={styles.account_avatar}>
                  <Form.Item className="cursor-pointer">
                    <UploadAvatar
                      imageUrl={imageUrl}
                      setImageUrl={setImageUrl}
                    />
                  </Form.Item>
                  <img
                    alt=""
                    src="/assets/icons/camera.svg"
                    className={styles.account_avatar_icon}
                  />
                </div>

                <Col
                  xs={16}
                  md={8}
                  style={{ display: "flex", alignItems: "center" }}>
                  <div className={styles.header}>
                    <span className={styles.item_label}>Tên tài khoản</span>
                    <div className={styles.name}>
                      <Form.Item name="name">
                        <Input size="large" type="text" />
                      </Form.Item>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col xs={24} md={12}>
                  <span className={styles.item_label}>Ngày sinh</span>
                  <Form.Item name="birthday">
                    <DatePicker
                      size="large"
                      format={dateFormat}
                      disabledDate={(now) => now && now > moment()}
                      placeholder="Chọn ngày sinh"
                      allowClear={false}
                      className={styles.text_input}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <span className={styles.item_label}>Địa chỉ</span>
                  <Form.Item className="profile" name="address">
                    <Select
                      size="large"
                      placeholder="Tỉnh"
                      className={styles.form_item}>
                      {(provinceList || []).map((province) => (
                        <Select.Option key={province.id} value={province.id}>
                          {province.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col xs={24} md={12}>
                  <span className={styles.item_label}>Số điện thoại</span>
                  <Form.Item name="phoneNumber">
                    <InputNumber
                      controls={false}
                      placeholder="Nhập số điện thoại"
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <span className={styles.item_label}>Email</span>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Email không đúng",
                      },
                    ]}>
                    <Input placeholder="Nhập email" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              {/* <Address
                setRewardDiamond={setRewardDiamond}
                setIsRewardDiamondModal={setIsRewardDiamondModal}
              /> */}

              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                {router.query.next ? (
                  <button type="submit" className={styles.btn_next}>
                    Tiếp tục
                  </button>
                ) : (
                  renderActionBtn()
                )}
              </div>
            </Form>
          </div>

          <div id="recaptcha-container" />

          {/* {isChangePhoneNumberModal && (
            <ChangePhoneNumber
              isChangePhoneNumberModal={isChangePhoneNumberModal}
              handleCloseChangePhoneNumberModal={() =>
                setIsChangePhoneNumberModal(false)
              }
              handleSetPhoneNumber={(val) => setPhoneNumberInput(val)}
              rewardDiamond={rewardDiamond}
              setRewardDiamond={setRewardDiamond}
              setIsRewardDiamondModal={setIsRewardDiamondModal}
            />
          )}

          {isChangeEmailModal && (
            <ChangeEmail
              isChangeEmailModal={isChangeEmailModal}
              handleCloseChangeEmailModal={() => {
                setIsChangeEmailModal(false);
                dispatch(getProfileRequest({ userCode: profile.code }));
              }}
              handleSetEmail={(val) => setEmailInput(val)}
            />
          )}

          <ModalRewardDiamond
            isRewardDiamondModal={isRewardDiamondModal}
            setIsRewardDiamondModal={setIsRewardDiamondModal}
            rewardDiamond={rewardDiamond}
          /> */}
        </div>
      </div>
      <SuccessModal
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        title="Sửa tài khoản thành công!"
      />
    </MainLayout>
  );
};

export default memo(Account);
