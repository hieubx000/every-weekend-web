import { FC, memo, useState, useCallback, useEffect } from "react";

import styles from "./style.module.scss";
import SupplierLayout from "@/components/layouts/SupplierLayout";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import BlogForm from "@/modules/Manage/BlogForm";
import { useRouter } from "next/router";
import { Blog, Destination } from "@/types/common";
import { getBlogByIdApi } from "@/api/services/blog";
import { handleError } from "@/utils/helper";
import AdminLayout from "@/components/layouts/AdminLayout";
import DestinationForm from "@/modules/Manage/DestinationForm";
import { getDestinationByIdApi } from "@/api/services/destination";

type Props = {};

const EditDestination: FC<Props> = ({}) => {
  const router = useRouter();

  const [destinationDetail, setDestinationDetail] = useState<Destination>();

  const getData = useCallback(async () => {
    const id = router.query.id ? router.query.id.toString() : "";

    try {
      const response = await getDestinationByIdApi(id);
      setDestinationDetail({
        id: response.data.data._id,
        title: response.data.data.title,
        description: response.data.data.description,
        imageUrl: response.data.data.imageUrl,
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
      name: "Edit",
      url: "/admin/blogs/Edit",
    },
  ];
  return (
    <AdminLayout breadcrumbItems={breadcrumbItems}>
      <DestinationForm destinationDetail={destinationDetail} />
    </AdminLayout>
  );
};

export default memo(EditDestination);
