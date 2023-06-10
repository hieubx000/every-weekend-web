import { FC, memo } from "react";

import { Button, Table, Input } from "antd";
import SupplierLayout from "@/components/layouts/SupplierLayout";
import { useManageTour } from "@/hooks/manage/useManageTour";

import styles from "./style.module.scss";
import { useManageHotel } from "@/hooks/manage/useManageHotel";
import { useManageBlog } from "@/hooks/manage/useManageBlog";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAdminBlog } from "@/hooks/admin/useAdminBlog";
import { useAdminDestination } from "@/hooks/admin/useAdminDestionation";

const { Search } = Input;

type Props = {};

const AdminDestinations: FC<Props> = ({}) => {
  const { breadcrumbItems, tableColumns, tableData, pushToCreateDestination } =
    useAdminDestination();

  return (
    <AdminLayout breadcrumbItems={breadcrumbItems}>
      <div className={styles.container}>
        <div className={styles.container_top}>
          <Button
            type="primary"
            shape="round"
            onClick={pushToCreateDestination}>
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
        <Button type="dashed" block onClick={pushToCreateDestination}>
          Thêm mới
        </Button>
      </div>
    </AdminLayout>
  );
};

export default memo(AdminDestinations);
