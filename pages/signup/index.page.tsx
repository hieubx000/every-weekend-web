import { FC, memo, useEffect, useCallback } from "react";

import styles from "./style.module.scss";
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  InputNumber,
} from "antd";
import { provinceList } from "@/public/assets/data/intData";
import { getListAccountApi, postRegister } from "@/api/services/auth";
import { handleError } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/redux/actions/Token";
import authSlice, { setTokenUser } from "@/redux/slice/authSlice";

type Props = {};

const SignUp: FC<Props> = ({}) => {
  const onFinish = useCallback(async (values: any) => {
    try {
      const res = await postRegister({
        userName: values.userName,
        password: values.password,
        name: values.name,
        address: values.address,
        phoneNumber: values.phoneNumber,
      });
      console.log("MTS2023", res);
    } catch (error) {
      handleError(error);
    }
  }, []);

  // dispatch(setToken(JSON.stringify(token)));
  const dispatch = useDispatch();
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const res = useSelector((state: any) => state.auth.token);
  const onClick = () => {
    dispatch(setTokenUser("abc"));
  };
  const onClick1 = () => {
    console.log("ahihi", res);
  };

  return (
    <AuthLayout>
      <Button onClick={onClick}>Click</Button>
      <Button onClick={onClick1}>Click1</Button>
      <div className={styles.container}>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles.form}>
          <div className={styles.form_logo}>
            <img src="/assets/images/logo.png" alt="" title="" />
          </div>

          <h3>Thông tin cá nhân</h3>
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
            <Input
              placeholder="Nhập họ tên"
              size="large"
              className={styles.form_item}
            />
          </Form.Item>

          <Row gutter={28}>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}>
                <InputNumber
                  controls={false}
                  placeholder="Nhập số điện thoại"
                  size="large"
                  className={styles.form_item}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
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

          <h3>Thông tin tài khoản</h3>
          <Form.Item
            label="Tên đăng nhập"
            name="userName"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}>
            <Input
              placeholder="Tên đăng nhập"
              size="large"
              className={styles.form_item}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
            <Input.Password
              placeholder="Mật khẩu"
              size="large"
              className={styles.form_item}
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="rePassword"
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
            ]}>
            <Input.Password
              placeholder="Xác nhận mật khẩu"
              size="large"
              className={styles.form_item}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="bold"
              type="primary"
              htmlType="submit"
              size="large"
              block>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default memo(SignUp);
