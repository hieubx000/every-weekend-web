import { FC, memo } from "react";

import styles from "./style.module.scss";
import Link from "next/link";

type Props = {};

const HomePromotion: FC<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/Frame-3150-min.png?alt=media&token=2df7f3f2-0241-4676-bfe9-f96022b19a35"
          alt=""
        />
      </Link>
      <Link href="/">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/Frame-3151-min.png?alt=media&token=dddda348-98ba-495e-accb-d9fd5675e7fc"
          alt=""
        />
      </Link>
    </div>
  );
};

export default memo(HomePromotion);
