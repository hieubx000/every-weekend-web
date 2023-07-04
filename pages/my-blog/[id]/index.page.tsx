import { FC, memo, useState, useCallback, useEffect } from "react";

import styles from "./style.module.scss";
import BlogForm from "@/modules/Manage/BlogForm";
import { useRouter } from "next/router";
import { Blog } from "@/types/common";
import { handleError } from "@/utils/helper";
import MainLayout from "@/components/layouts/MainLayout";
import { getBlogByIdApi } from "@/pages/api/services/blog";

type Props = {};

const CreateBlog: FC<Props> = ({}) => {
  const router = useRouter();

  const [blogDetail, setBlogDetail] = useState<Blog>();

  const getData = useCallback(async () => {
    const id = router.query.id ? router.query.id.toString() : "";

    try {
      const response = await getBlogByIdApi(id);
      setBlogDetail({
        id: response.data.data._id,
        title: response.data.data.title,
        category: response.data.data.category,
        imageUrl: response.data.data.imageUrl,
        content: response.data.data.content,
        status: response.data.data.status,
        summary: response.data.data.summary,
      });
    } catch (error) {
      handleError(error);
    }
  }, [router]);

  useEffect(() => {
    getData();
  }, [router]);

  return (
    <MainLayout>
      <div className={styles.container}>
        <BlogForm blogDetail={blogDetail} />
      </div>
    </MainLayout>
  );
};

export default memo(CreateBlog);
