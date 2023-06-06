import React, { FC, memo, useState, useEffect } from "react";

import styles from "./style.module.scss";
import MainHeader from "@/components/common/MainHeader";
import TopBar from "@/components/common/TopBar";
import Loading from "@/components/common/Loading";

type Props = {
  children: React.ReactNode;
  center?: boolean;
};

const MainLayout: FC<Props> = ({ children, center }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className={styles.container}>
      <TopBar />
      <MainHeader />
      <div className={center ? styles.center : ""}>
        {isLoading ? (
          <div className={styles.loading}>
            <Loading />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default memo(MainLayout);
