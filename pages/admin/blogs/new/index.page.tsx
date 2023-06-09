import { FC, memo } from "react";

import styles from "./style.module.scss";
import SupplierLayout from "@/components/layouts/SupplierLayout";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import BlogForm from "@/modules/Manage/BlogForm";
import AdminLayout from "@/components/layouts/AdminLayout";

type Props = {};

const breadcrumbItems: IBreadcrumb[] = [
  {
    id: "1",
    name: "Admin",
    url: "/admin/blogs",
  },
  {
    id: "2",
    name: "Blogs",
    url: "/admin/blogs",
  },
  {
    id: "3",
    name: "New",
    url: "/admin/blogs/new",
  },
];

const CreateBlog: FC<Props> = ({}) => {
  return (
    <AdminLayout breadcrumbItems={breadcrumbItems}>
      <BlogForm />
    </AdminLayout>
  );
};

export default memo(CreateBlog);
