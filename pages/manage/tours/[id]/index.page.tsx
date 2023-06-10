import { FC, memo, useCallback, useEffect, useState } from "react";

import SupplierLayout from "@/components/layouts/SupplierLayout";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import TourForm from "@/modules/Manage/TourForm";
import { useRouter } from "next/router";
import { Tour } from "@/types/api/tour";
import { ITour } from "@/types/services/tour";
import { handleError } from "@/utils/helper";
import { getTourByIdApi } from "@/api/services/tour";

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

const EditTour: FC<Props> = ({}) => {
  const router = useRouter();

  const [tourDetail, setTourDetail] = useState<ITour>();

  const getData = useCallback(async () => {
    const id = router.query.id ? router.query.id.toString() : "";

    try {
      const response = await getTourByIdApi(id);

      setTourDetail({
        id: response.data.data._id,
        title: response.data.data.title,
        slug: response.data.data.slug,
        imageUrl: response.data.data.imageUrl,
        about: response.data.data.about,
        fromDate: response.data.data.fromDate,
        startTime: response.data.data.startTime,
        beforeStartTime: response.data.data.beforeStartTime,
        gatheringPlace: response.data.data.gatheringPlace,
        numOfDays: response.data.data.numOfDays,
        maxSlot: response.data.data.maxSlot,
        vehicle: response.data.data.vehicle,
        sightseeing: response.data.data.sightseeing,
        schedule: response.data.data.schedule,
        price: response.data.data.price,
        discount: response.data.data.discount,
        fromDestination: response.data.data.fromDestination,
        toDestination: response.data.data.toDestination,
        introduction: response.data.data.introduction,
        introLink: response.data.data.introLink,
        tourGuide: response.data.data.tourGuide,
      });
    } catch (error) {
      handleError(error);
    }
  }, [router]);

  useEffect(() => {
    getData();
  }, [router]);
  return (
    <SupplierLayout breadcrumbItems={breadcrumbItems}>
      <TourForm tourDetail={tourDetail} />
    </SupplierLayout>
  );
};

export default memo(EditTour);
