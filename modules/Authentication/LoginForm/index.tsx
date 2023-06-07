import { FC, memo, useCallback } from "react";

import { Button, Form, Input } from "antd";

import styles from "./style.module.scss";
import { postLogInApi } from "@/api/services/auth";
import { handleError } from "@/utils/helper";
import { useRouter } from "next/router";
import { authStorage } from "@/storage/authStorage";

type Props = {};

const LoginForm: FC<Props> = ({}) => {
  const router = useRouter();

  const onFinish = useCallback(async (values: any) => {
    try {
      const response = await postLogInApi(values);
      // dispatch(setProfile(response.data.data.data));
      // dispatch(setTokenUser(response.data.data.token));
      authStorage.setUserToken(response.data.data.token);
      authStorage.setUserProfile(response.data.data.data);
      router.push("/");
    } catch (error) {
      handleError(error);
    }
  }, []);

  return (
    <Form
      name="basic"
      onFinish={onFinish}
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

export default memo(LoginForm);
