import { FC, memo } from "react";

import SupplierLayout from "@/components/layouts/SupplierLayout";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import HotelForm from "@/modules/Manage/HotelForm";

type Props = {};

const breadcrumbItems: IBreadcrumb[] = [
  {
    id: "1",
    name: "Manage",
    url: "/manage/tours",
  },
  {
    id: "2",
    name: "Tour",
    url: "/manage/tours",
  },
  {
    id: "3",
    name: "Edit",
    url: "",
  },
];

const EditHotel: FC<Props> = ({}) => {
  return (
    <SupplierLayout breadcrumbItems={breadcrumbItems}>
      <HotelForm />
    </SupplierLayout>
  );
};

export default memo(EditHotel);
