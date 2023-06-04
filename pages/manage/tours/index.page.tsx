import { FC, memo } from "react";

import { Button, Table, Input } from "antd";
import SupplierLayout from "@/components/layouts/SupplierLayout";
import { useManageTour } from "@/hooks/manage/useManageTour";

import styles from "./style.module.scss";

const { Search } = Input;

type Props = {};

const ManageTours: FC<Props> = ({}) => {
  const { breadcrumbItems, tableColumns, tableData, pushToCreateTour } =
    useManageTour();

  return (
    <SupplierLayout breadcrumbItems={breadcrumbItems}>
      <div className={styles.container}>
        <div className={styles.container_top}>
          <Button type="primary" shape="round" onClick={pushToCreateTour}>
            Thêm mới
          </Button>
          <Search
            placeholder="Tìm kiếm..."
            allowClear
            onSearch={() => {}}
            className={styles.container_top_search}
          />
        </div>
        <Table columns={tableColumns} dataSource={tableData} />
        <Button type="dashed" block onClick={pushToCreateTour}>
          Thêm mới
        </Button>
      </div>
    </SupplierLayout>
  );
};

export default memo(ManageTours);
