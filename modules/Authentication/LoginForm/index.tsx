import { FC, memo } from "react";

import { Button, Form, Input } from "antd";

import styles from "./style.module.scss";

type Props = {};

const TopBar: FC<Props> = ({}) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles.container}>
      <img src="/assets/images/logo.png" alt="" title="" />
      <Form.Item
        label="Tên đăng nhập"
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}>
        <Input size="large" className={styles.form_item} />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
        <Input.Password size="large" className={styles.form_item} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(TopBar);
