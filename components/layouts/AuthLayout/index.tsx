import React, { FC, memo, useState, useEffect } from "react";

import AuthHeader from "@/components/common/AuthHeader";

import styles from "./style.module.scss";
import Loading from "@/components/common/Loading";

type Props = {
  children: React.ReactNode;
  center?: boolean;
};

const AuthLayout: FC<Props> = ({ children, center }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AuthHeader />
          <div>{children}</div>
        </>
      )}
    </div>
  );
};

export default memo(AuthLayout);
