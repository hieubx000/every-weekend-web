import React, { FC, memo } from "react";

import styles from "./style.module.scss";
import MainHeader from "@/components/common/MainHeader";
import TopBar from "@/components/common/TopBar";

type Props = {
  children: React.ReactNode;
};

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <TopBar/>
      <MainHeader />
      {children}
    </div>
  );
};

export default memo(MainLayout);
