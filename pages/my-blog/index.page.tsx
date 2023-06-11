import { FC, memo } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import { Table, Button } from "antd";
import { useManageBlog } from "@/hooks/manage/useManageBlog";
import { useRouter } from "next/router";

type Props = {};

const MyBlogs: FC<Props> = ({}) => {
  const { tableColumns, tableData } = useManageBlog();
  const router = useRouter()
  return (
    <MainLayout>
      <div className={styles.container}>
        <Button type="primary" className="bold" onClick={() => router.push("/my-blog/new")}>Tạo mới</Button>
        <Table bordered columns={tableColumns} dataSource={tableData} />
      </div>
    </MainLayout>
  );
};

export default memo(MyBlogs);
