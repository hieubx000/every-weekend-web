import { FC, memo } from "react";

import styles from "./style.module.scss";
import SupplierLayout from "@/components/layouts/SupplierLayout";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import BlogForm from "@/modules/Manage/BlogForm";

type Props = {};

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
    name: "New",
    url: "/manage/blogs/new",
  },
];

const CreateBlog: FC<Props> = ({}) => {
  return (
    <SupplierLayout breadcrumbItems={breadcrumbItems}>
      <BlogForm />
    </SupplierLayout>
  );
};

export default memo(CreateBlog);
