import { FC, memo, useCallback } from "react";

import { Button, Form, Input } from "antd";

import styles from "./style.module.scss";
import { handleError } from "@/utils/helper";
import { useRouter } from "next/router";
import { authStorage } from "@/storage/authStorage";
import { Role } from "@/types/commonTypes";
import { postLogInApi } from "@/pages/api/services/auth";

type Props = {};

const LoginForm: FC<Props> = ({}) => {
  const router = useRouter();

  const onFinish = useCallback(async (values: any) => {
    try {
      const role = router.pathname.slice(7) as unknown as Role;
      const response = await postLogInApi(values);

      authStorage.setUserProfile({
        token: response.data.data.token,
        role: role,
        profile: response.data.data.data,
      });
      switch (role) {
        case Role.customer:
          router.push("/");
          break;
        case Role.supplier:
          router.push("/manage/tours");
          break;
        case Role.admin:
          router.push("/admin/accounts");
          break;
        default:
          router.push("/");
          break;
      }
    } catch (error) {
      handleError(error);
    }
  }, [router]);

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      className={styles.container}>
      <img src="/assets/icons/logo.svg" alt="" title="" />
      <Form.Item
        label="Tên đăng nhập"
        name="userName"
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
