import { FC, memo } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import { Table } from "antd";
import { useManageBookingHotel } from "@/hooks/manage/useManageBookingHotel";

type Props = {};

const MyBooKingHotel: FC<Props> = ({}) => {
  const { tableColumns, tableData } = useManageBookingHotel();

  return (
    <MainLayout>
      <div className={styles.container}>
        <Table bordered columns={tableColumns} dataSource={tableData} />
      </div>
    </MainLayout>
  );
};

export default memo(MyBooKingHotel);
