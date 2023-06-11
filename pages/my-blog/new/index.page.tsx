import { FC, memo } from "react";

import styles from "./style.module.scss";
import BlogForm from "@/modules/Manage/BlogForm";
import MainLayout from "@/components/layouts/MainLayout";

type Props = {};

const CreateBlog: FC<Props> = ({}) => {
  return (
    <MainLayout>
      <div className={styles.container}>
        <h1>Thêm bài viết mới</h1>
        <BlogForm />
      </div>
    </MainLayout>
  );
};

export default memo(CreateBlog);
