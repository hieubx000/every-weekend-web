import { FC, memo } from "react";

import styles from "./style.module.scss";
import { IDestination } from "@/types/services/destination";
import { Destination } from "@/types/common";
import { useRouter } from "next/router";

type Props = {
  data: Destination;
};

const DestinationCard: FC<Props> = ({ data }) => {
  const router = useRouter();
  return (
    <div
      className={styles.container}
      onClick={() => router.push(`/services/tours?toDestination=${data._id}`)}>
      <img src={data.imageUrl} width={191} height={191} alt="" />
      <div className={styles.title}>{data.title}</div>
    </div>
  );
};

export default memo(DestinationCard);
