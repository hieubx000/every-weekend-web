import { FC, memo } from "react";

import styles from "./style.module.scss";

type Props = {};

const Hotels: FC<Props> = ({}) => {
  return <div className={styles.container}>Hotels</div>;
};

export default memo(Hotels);