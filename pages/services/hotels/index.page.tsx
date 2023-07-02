import { FC, memo, useCallback, useEffect, useState } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import HotelSidebar from "@/modules/Services/Hotels/HotelSidebar";
import HotelCard from "@/components/common/HotelCard";
import { getAllHotelApi } from "@/api/services/hotel";
import { IHotel } from "@/types/services/hotels";
import { Empty } from "antd";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { useRouter } from "next/router";

type Props = {};

const Hotels: FC<Props> = ({}) => {
  const router = useRouter();
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [sortParams, setSortParams] = useState<{
    sortField: string;
    sortDirection: -1 | 1;
  }>();

  useEffect(() => {
    switch (router.query.sort) {
      case "1":
        setSortParams({ sortField: "price", sortDirection: -1 });
        break;
      case "2":
        setSortParams({ sortField: "price", sortDirection: 1 });
        break;

      default:
        setSortParams({ sortField: "price", sortDirection: -1 });
        break;
    }
  }, [router]);

  const getData = useCallback(async () => {
    try {
      const response = await getAllHotelApi({
        ...sortParams,
        minPrice: router.query.minPrice
          ? parseInt(router.query.minPrice.toString())
          : undefined,
        maxPrice: router.query.maxPrice
          ? parseInt(router.query.maxPrice.toString())
          : undefined,
        toDestination: router.query.toDestination
          ? router.query.toDestination.toString()
          : undefined,
      });
      setHotels(response.data.data);
    } catch (error) {}
  }, [sortParams]);

  useEffect(() => {
    getData();
  }, [sortParams]);

  return (
    <MainLayout center>
      <div className={styles.container}>
        <HotelSidebar />
        <div className={styles.content}>
          <div className={styles.header}>
            <div>{hotels.length || 0} kết quả được tìm thấy</div>
            <div>
              <CiGrid2H />
              <CiGrid41 />
            </div>
          </div>

          <div>
            {hotels.length > 0 ? (
              <div className={styles.grid}>
                {hotels.map((item, index) => (
                  <HotelCard key={item.id} data={item} />
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default memo(Hotels);
