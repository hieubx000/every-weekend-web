import { FC, memo } from "react";
import Link from "next/link";

import { Breadcrumb } from "antd";

import styles from "./style.module.scss";

export type IBreadcrumb = {
  id: string;
  name: string;
  url?: string;
};

type Props = {
  items: IBreadcrumb[];
};

const CustomBreadcrumb: FC<Props> = ({ items }) => {
  return (
    <Breadcrumb className={styles.container}>
      {items.map((item, index) => (
        <Breadcrumb.Item key={item.id}>
          {index === items.length - 1 ? (
            item.name
          ) : (
            <Link href={item.url || ""}>{item.name}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default memo(CustomBreadcrumb);
