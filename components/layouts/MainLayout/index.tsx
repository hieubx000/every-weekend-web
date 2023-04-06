import React, { FC, memo } from "react";

import styles from "./style.module.scss";

type Props = {};

const MainLayout: FC<Props> = () => {
  return <div className={styles.container}>ahi</div>;
};

export default memo(MainLayout);
