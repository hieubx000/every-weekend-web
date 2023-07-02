import { FC, memo, useCallback, useEffect, useState } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import TourSidebar, {
  NumOfDays,
  numOfDayList,
} from "@/modules/Services/Tours/TourSidebar";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import TourCard from "@/components/common/TourCard";
import { ITour } from "@/types/services/tour";
import { getAllTourApi } from "@/api/services/tour";
import { Empty } from "antd";
import { useRouter } from "next/router";

type Props = {};

const Tours: FC<Props> = ({}) => {
  const [tours, setTours] = useState<ITour[]>([]);
  const [numOfDayFilter, setNumOfDayFilter] = useState<NumOfDays | undefined>();
  const [fromDate, setFromDate] = useState<number | undefined>(undefined);
  const router = useRouter();

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
      const response = router.query.numOfDayFilter
        ? await getAllTourApi({
            ...sortParams,
            minPrice: router.query.minPrice
              ? parseInt(router.query.minPrice.toString())
              : undefined,
            maxPrice: router.query.maxPrice
              ? parseInt(router.query.maxPrice.toString())
              : undefined,
            fromDate: router.query.fromDate
              ? router.query.fromDate.toString()
              : undefined,
            ...numOfDayList.filter((item) => {
              return item.id == router.query.numOfDayFilter;
            })[0].params,
            fromDestination: router.query.fromDestination
              ? parseInt(router.query.fromDestination.toString())
              : undefined,
            toDestination: router.query.toDestination
              ? router.query.toDestination.toString()
              : undefined,
          })
        : await getAllTourApi({
            ...sortParams,
            minPrice: router.query.minPrice
              ? parseInt(router.query.minPrice.toString())
              : undefined,
            maxPrice: router.query.maxPrice
              ? parseInt(router.query.maxPrice.toString())
              : undefined,
            fromDate: router.query.fromDate
              ? router.query.fromDate.toString()
              : undefined,
            fromDestination: router.query.fromDestination
              ? parseInt(router.query.fromDestination.toString())
              : undefined,
            toDestination: router.query.toDestination
              ? router.query.toDestination.toString()
              : undefined,
          });
      setTours(response.data.data);
    } catch (error) {}
  }, [sortParams, fromDate, numOfDayFilter]);

  useEffect(() => {
    getData();
  }, [sortParams, fromDate, numOfDayFilter]);

  return (
    <MainLayout center>
      <div className={styles.container}>
        <TourSidebar
          setFromDate={setFromDate}
          setNumOfDayFilter={setNumOfDayFilter}
          numOfDayFilter={numOfDayFilter}
        />
        <div className={styles.content}>
          <div className={styles.header}>
            <div>{tours.length || 0} kết quả được tìm thấy</div>
            <div>
              <CiGrid2H />
              <CiGrid41 />
            </div>
          </div>

          <div>
            {tours.length > 0 ? (
              <div className={styles.grid}>
                {tours.map((item, index) => (
                  <TourCard key={index} data={item} />
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

export default memo(Tours);
