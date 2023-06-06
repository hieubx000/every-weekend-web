import { FC, memo } from "react";

import styles from "./style.module.scss";
import LinkTo from "../LinkTo";
import { Button } from "antd";

type Props = {};

const AuthHeader: FC<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_logo}>
          <LinkTo href="/">
            <img src="/assets/images/logo.png" alt="" title="" />
          </LinkTo>
        </div>
        <div className={styles.header_action}>
          <Button size="large">Trang chủ</Button>
          <Button type="primary" size="large">
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(AuthHeader);
