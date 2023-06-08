import { FC, memo } from "react";

import styles from "./style.module.scss";

type Props = {};

const ErrorPage: FC<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <img src="/assets/icons/404_error.svg" width={500} alt="" />
    </div>
  );
};

export default memo(ErrorPage);
