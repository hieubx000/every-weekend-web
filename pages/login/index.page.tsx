import { FC, memo } from "react";

import { Button, Checkbox, Form, Input, Select } from "antd";

import styles from "./style.module.scss";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layouts/AuthLayout";

type Props = {};

const Login: FC<Props> = ({}) => {
  const router = useRouter();

  const onFinish = (values: any) => {
    router.push(`/login/${values.role ?? "customer"}`);
  };

  return (
    <AuthLayout>
      <div className={styles.container}>
        <div className={styles.welcome}>
          <div className={styles.welcome_title}>
            Chào mừng bạn đến với <br /> EVERY WEEKEND
          </div>
          <div>
            <Form
              className={styles.form}
              name="basic"
              onFinish={onFinish}
              autoComplete="off">
              <Form.Item label="Vai trò của bạn" name="role">
                <Select
                  defaultValue="customer"
                  size="large"
                  options={[
                    { value: "customer", label: "Khách hàng" },
                    { value: "supplier", label: "Nhà cung cấp" },
                    { value: "admin", label: "Quản trị viên" },
                  ]}
                />
              </Form.Item>

              <Form.Item>
                <Button size="large" type="primary" htmlType="submit" block>
                  Tiếp tục
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div>
          <img src="/assets/icons/auth/authentication.svg" width={600} alt="" />
        </div>
      </div>
    </AuthLayout>
  );
};

export default memo(Login);
