import { FC, memo, useCallback } from "react";

import styles from "./style.module.scss";
import LinkTo from "../LinkTo";
import { Button } from "antd";
import { useRouter } from "next/router";

type Props = {};

const AuthHeader: FC<Props> = ({}) => {
  const router = useRouter();

  const pushToLogin = useCallback(() => {
    router.push("/login");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_logo}>
          <LinkTo href="/">
            <img src="/assets/icons/logo.svg" alt="" title="" />
          </LinkTo>
        </div>
        <div className={styles.header_action}>
          <Button size="large">Trang chủ</Button>
          <Button type="primary" size="large" onClick={pushToLogin}>
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(AuthHeader);
