import React, { FC, memo } from "react";

import styles from "./style.module.scss";
import MainHeader from "@/components/common/MainHeader";
import TopBar from "@/components/common/TopBar";

type Props = {
  children: React.ReactNode;
  center?: boolean;
};

const MainLayout: FC<Props> = ({ children, center }) => {
  return (
    <div className={styles.container}>
      <TopBar />
      <MainHeader />
      <div className={center ? styles.center : ""}>{children}</div>
    </div>
  );
};

export default memo(MainLayout);
