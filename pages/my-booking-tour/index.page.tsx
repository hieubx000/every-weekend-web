import { FC, memo } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import { Table } from "antd";
import { useManageBookingTour } from "@/hooks/manage/useManageBookingTour";

type Props = {};

const MyBooKingTour: FC<Props> = ({}) => {
  const { tableColumns, tableData } = useManageBookingTour();

  return (
    <MainLayout>
      <div className={styles.container}>
        <Table bordered columns={tableColumns} dataSource={tableData} />
      </div>
    </MainLayout>
  );
};

export default memo(MyBooKingTour);
