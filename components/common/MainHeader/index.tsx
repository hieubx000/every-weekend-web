import React, { FC, memo } from "react";

import styles from "./style.module.scss";
import { VscAccount } from "react-icons/vsc";

type Props = {};

type IHeader = {
  id: string;
  name: string;
  url: string;
  items?: IHeader[];
};

const headerList: IHeader[] = [
  {
    id: "1",
    name: "Đặt Tour",
    url: "/",
    items: [
      {
        id: "tn",
        name: "Tour trong nước",
        url: "/",
      },
      {
        id: "qt",
        name: "Tour quốc tế",
        url: "/",
      },
    ],
  },
  {
    id: "2",
    name: "Vận chuyển",
    url: "/",
    items: [
      {
        id: "vmb",
        name: "Vé máy bay",
        url: "/",
      },
      {
        id: "vxk",
        name: "Vé xe khách",
        url: "/",
      },
      {
        id: "txtl",
        name: "Thuê xe tự lái",
        url: "/",
      },
    ],
  },
  {
    id: "3",
    name: "Chỗ ở",
    url: "/",
    items: [
      {
        id: "ks",
        name: "Khách sạn",
        url: "/",
      },
      {
        id: "hs",
        name: "HomeStay",
        url: "/",
      },
    ],
  },
];

const MainHeader: FC<Props> = () => {
  return (
    <div className={styles.container}>
      <img src='/assets/images/logo.png' alt="" />
      <div className={styles.menu}>
        {headerList.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <VscAccount />
    </div>
  );
};

export default memo(MainHeader);
