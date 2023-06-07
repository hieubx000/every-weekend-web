import { FC, memo } from "react";

import { Table, Input } from "antd";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAdminAccounts } from "@/hooks/admin/useAdminAccounts";

import styles from "./style.module.scss";

const { Search } = Input;

type Props = {};

const AdminAccount: FC<Props> = ({}) => {
  const { breadcrumbItems, tableColumns, tableData } = useAdminAccounts();

  return (
    <AdminLayout breadcrumbItems={breadcrumbItems}>
      <div className={styles.container}>
        <div className={styles.container_top}>
          <Search
            placeholder="Tìm kiếm..."
            allowClear
            onSearch={() => {}}
            className={styles.container_top_search}
          />
        </div>
        <Table columns={tableColumns} dataSource={tableData} rowKey="Id" />
      </div>
    </AdminLayout>
  );
};

export default memo(AdminAccount);
