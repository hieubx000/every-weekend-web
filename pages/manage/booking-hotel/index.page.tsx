import { FC, memo } from "react";

import { Button, Table, Input } from "antd";
import SupplierLayout from "@/components/layouts/SupplierLayout";
import { useManageTour } from "@/hooks/manage/useManageTour";

import styles from "./style.module.scss";
import { useManageHotel } from "@/hooks/manage/useManageHotel";
import { useManageBlog } from "@/hooks/manage/useManageBlog";
import { useManageBookingTour } from "@/hooks/manage/useManageBookingTour";
import { useManageBookingHotel } from "@/hooks/manage/useManageBookingHotel";

const { Search } = Input;

type Props = {};

const ManageBookingHotel: FC<Props> = ({}) => {
  const { breadcrumbItems, tableColumns, tableData } = useManageBookingHotel();

  return (
    <SupplierLayout breadcrumbItems={breadcrumbItems}>
      <div className={styles.container}>
        {/* <div className={styles.container_top}>
          <Button type="primary" shape="round" onClick={pushToCreateBlog}>
            Thêm mới
          </Button>
          <Search
            placeholder="Tìm kiếm..."
            allowClear
            onSearch={() => {}}
            className={styles.container_top_search}
          />
        </div> */}
        <Table columns={tableColumns} dataSource={tableData} />
        {/* <Button type="dashed" block onClick={pushToCreateBlog}>
          Thêm mới
        </Button> */}
      </div>
    </SupplierLayout>
  );
};

export default memo(ManageBookingHotel);
