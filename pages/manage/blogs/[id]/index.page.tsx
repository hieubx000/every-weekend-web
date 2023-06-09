import { FC, memo, useState, useCallback, useEffect } from "react";

import styles from "./style.module.scss";
import SupplierLayout from "@/components/layouts/SupplierLayout";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import BlogForm from "@/modules/Manage/BlogForm";
import { useRouter } from "next/router";
import { Blog } from "@/types/common";
import { getBlogByIdApi } from "@/api/services/blog";
import { handleError } from "@/utils/helper";

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

  const breadcrumbItems: IBreadcrumb[] = [
    {
      id: "1",
      name: "Manage",
      url: "/manage/blogs",
    },
    {
      id: "2",
      name: "Blogs",
      url: "/manage/blogs",
    },
    {
      id: "3",
      name: "Edit",
      url: "/manage/blogs/Edit",
    },
  ];
  return (
    <SupplierLayout breadcrumbItems={breadcrumbItems}>
      <BlogForm blogDetail={blogDetail} />
    </SupplierLayout>
  );
};

export default memo(CreateBlog);
