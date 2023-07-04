import { FC, memo, useState, useCallback, useEffect } from "react";

import SupplierLayout from "@/components/layouts/SupplierLayout";
import { IBreadcrumb } from "@/components/common/CustomBreadcrumb";
import HotelForm from "@/modules/Manage/HotelForm";
import { IHotel } from "@/types/services/hotels";
import { useRouter } from "next/router";
import { handleError } from "@/utils/helper";
import { getHotelByIdApi } from "@/pages/api/services/hotel";

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
  const [hotelDetail, setHotelDetail] = useState<IHotel>();
  const router = useRouter();

  const getData = useCallback(async () => {
    const id = router.query.id ? router.query.id.toString() : "";

    try {
      const response = await getHotelByIdApi(id);

      setHotelDetail({
        id: response.data.data._id,
        title: response.data.data.title,
        slug: response.data.data.slug,
        imageUrl: response.data.data.imageUrl,
        address: response.data.data.address,
        hotelService: response.data.data.hotelService,
        introduction: response.data.data.introduction,
        introLink: response.data.data.introLink,
        toDestination: response.data.data.toDestination,
        availability: response.data.data.availability,
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
      <HotelForm hotelDetail={hotelDetail} />
    </SupplierLayout>
  );
};

export default memo(EditHotel);
