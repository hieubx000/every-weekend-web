import { FC, memo } from "react";

import styles from "./style.module.scss";
import { IDestination } from "@/types/services/destination";

type Props = {
    data: IDestination
};

const DestinationCard: FC<Props> = ({data}) => {
  return <div className={styles.container}>
    <img src={data.imageUrl} width={191} height={191} alt="" />
    <div className={styles.title}>{data.name}</div>
  </div>;
};

export default memo(DestinationCard);