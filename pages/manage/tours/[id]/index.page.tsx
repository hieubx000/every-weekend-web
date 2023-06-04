import { FC, memo, useState, useEffect } from "react";

import styles from "./style.module.scss";
import SupplierLayout from "@/components/layouts/SupplierLayout";
import { Spin } from "antd";

type Props = {};

const ManageTourDetail: FC<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <SupplierLayout>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className={styles.container}>ManageTourDetail</div>
      )}
    </SupplierLayout>
  );
};

export default memo(ManageTourDetail);
