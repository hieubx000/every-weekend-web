import { FC, memo } from "react";

import AuthLayout from "@/components/layouts/AuthLayout";
import LoginForm from "@/modules/Authentication/LoginForm";

import styles from "./style.module.scss";

type Props = {};

const LoginCustomer: FC<Props> = ({}) => {
  return (
    <AuthLayout>
      <div className={styles.container}>
        <LoginForm />
        <div>
          <img src="/assets/icons/auth/authentication.svg" width={600} alt="" />
        </div>
      </div>
    </AuthLayout>
  );
};

export default memo(LoginCustomer);
