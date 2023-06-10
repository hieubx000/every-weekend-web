import { FC, memo } from "react";

import SupplierLayout from "@/components/layouts/SupplierLayout";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import BlogForm from "@/modules/Manage/BlogForm";
import AdminLayout from "@/components/layouts/AdminLayout";
import DestinationForm from "@/modules/Manage/DestinationForm";

type Props = {};

const breadcrumbItems: IBreadcrumb[] = [
  {
    id: "1",
    name: "Admin",
    url: "/admin/accounts",
  },
  {
    id: "2",
    name: "điểm đến",
    url: "/admin/destinations",
  },
  {
    id: "3",
    name: "new",
    url: "/admin/destinations/new",
  },
];

const CreateDestination: FC<Props> = ({}) => {
  return (
    <AdminLayout breadcrumbItems={breadcrumbItems}>
      <DestinationForm />
    </AdminLayout>
  );
};

export default memo(CreateDestination);
