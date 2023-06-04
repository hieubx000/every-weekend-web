import { FC, memo } from "react";

import styles from "./style.module.scss";
import { Spin } from "antd";

type Props = {};

const Loading: FC<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <Spin size="large" />
    </div>
  );
};

export default memo(Loading);
