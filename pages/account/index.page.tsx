import { FC, memo, useState } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd";
import UploadAvatar from "@/components/common/UploadAvatar/UploadAvatar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import { provinceList } from "@/public/assets/data/intData";

type Props = {};

const formatBirthday = "YYYY-MM-DD";

interface IRewardDiamond {
  name: string;
  diamond: number;
}

const Account: FC<Props> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const profile = {};

  const [avatar, setAvatar] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const [isChangePhoneNumberModal, setIsChangePhoneNumberModal] =
    useState(false);
  const [isChangeEmailModal, setIsChangeEmailModal] = useState(false);

  const [rewardDiamond, setRewardDiamond] = useState<IRewardDiamond>(
    {} as IRewardDiamond,
  );
  const [isRewardDiamondModal, setIsRewardDiamondModal] = useState(false);

  const onFinish = async (values: any) => {
    console.log("MTS22023", values);

    //   const dataInfomation: any = {}
    //   if (avatarUrl) dataInfomation.avatar = avatarUrl
    //   if (values.name) dataInfomation.name = values.name
    //   if (values.email) dataInfomation.email = values.email
    //   if (typeof values.gender === 'number') dataInfomation.gender = values.gender
    //   if (values.birthday) dataInfomation.birthday = moment(values.birthday).format(formatBirthday) || ''
    //   if (Object.keys(dataInfomation).length) {
    //     try {
    //       const { data } = await patchUserInfomationApi(dataInfomation, profile.code)
    //       if (data.data.accountInfoRewarded) {
    //         setIsRewardDiamondModal(true)
    //         setRewardDiamond({ name: "thông tin tài khoản", diamond: data.data.accountInfoRewarded })
    //       }
    //       const response = await getProfileApi(profile.code)
    //       // dispatch(getProfileSuccess({ profile: response.data.data }))
    //       dispatch(getProfileRequest({ userCode: profile.code }))
    //       if (router.query.next) {
    //         const { name, birthday, gender } = data.data || {}
    //         const {addresses} = response?.data?.data || {}
    //         if (!name) return message.warning("Bạn phải thêm tên người dùng để tiếp tục ứng tuyển!")
    //         if (!data.data.phoneNumber) return message.warning("Bạn phải thêm số điện thoại để tiếp tục ứng tuyển!")
    //         if (!birthday) return message.warning("Bạn phải thêm ngày sinh để tiếp tục ứng tuyển!")
    //         if (typeof gender !== 'number') return message.warning("Bạn phải thêm giới tính để tiếp tục ứng tuyển!")
    //         if (!addresses?.length) return message.warning("Bạn phải thêm địa chỉ để tiếp tục ứng tuyển!")
    //         const slug = decodeURIComponent(router.query.next as string).split("/") || []
    //         localStorage.setItem(storageConstant.localStorage.flagAutoApplyJob, slug[slug.length - 1])
    //         if (name && data.data.phoneNumber && birthday && typeof gender === 'number' && addresses.length) {
    //           const objRouter: any = { pathname: decodeURIComponent(String(router.query.next)) }
    //           if (router.query.attachNext) objRouter.query = { next: decodeURIComponent(String(router.query.attachNext)) }
    //           router.push(objRouter)
    //         }
    //       }
    //       else message.success(t('profile.updateSuccess'))
    //     } catch (error) {
    //     //   handleError(error)
    //     }
    //   }
  };

  //   const valueForm = {
  //     name: profile.name || "",
  //     birthday: profile.birthday ? moment(profile?.birthday, formatBirthday) : "",
  //     gender: profile.gender ?? "",
  //     email: profile.email || "",
  //     phoneNumber: profile.phoneNumber || "",
  //   };

  // const renderGender = gender => Gender[gender]

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
                      avatar={avatar}
                      setAvatar={setAvatar}
                      setAvatarUrl={setAvatarUrl}
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
                      format="DD-MM-YYYY"
                      disabledDate={(now) => now && now > moment()}
                      placeholder="Chọn ngày sinh"
                      allowClear={false}
                      className={styles.text_input}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <span className={styles.item_label}>Địa chỉ</span>
                  <Form.Item className="profile" name="gender">
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
    </MainLayout>
  );
};

export default memo(Account);
