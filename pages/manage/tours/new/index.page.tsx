import { FC, memo } from "react";

import SupplierLayout from "@/components/layouts/SupplierLayout";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import TourForm from "@/modules/Manage/TourForm";

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
    name: "New",
    url: "/manage/tours/new",
  },
];

const CreateTour: FC<Props> = ({}) => {
  return (
    <SupplierLayout breadcrumbItems={breadcrumbItems}>
      <TourForm />
    </SupplierLayout>
  );
};

export default memo(CreateTour);
