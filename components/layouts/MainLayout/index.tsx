import React, { FC, memo, useState, useEffect } from "react";

import styles from "./style.module.scss";
import MainHeader from "@/components/common/MainHeader";
import TopBar from "@/components/common/TopBar";
import Loading from "@/components/common/Loading";
import useUserProfile from "@/hooks/useUserProfile";
import AuthHeader from "@/components/common/AuthHeader";
import Footer from "@/components/common/Footer";

type Props = {
  children: React.ReactNode;
  center?: boolean;
};

const MainLayout: FC<Props> = ({ children, center }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = useUserProfile();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className={styles.container}>
      <TopBar />
      {userToken ? <MainHeader /> : <AuthHeader />}
      <div className={center ? styles.center : ""}>
        {isLoading ? (
          <div className={styles.loading}>
            <Loading />
          </div>
        ) : (
          children
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default memo(MainLayout);
