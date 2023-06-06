import { FC, memo } from "react";

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

type Props = {};

const SignUp: FC<Props> = ({}) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthLayout>
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
            name="username"
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
