import { FC, memo, useState, useEffect } from "react";
import { RiCustomerServiceLine } from "react-icons/ri";
import { MdOutlineTour, MdOutlineHotel } from "react-icons/md";
import { Menu, MenuProps } from "antd";

import styles from "./style.module.scss";
import { useRouter } from "next/router";

type Props = {};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  href?: string,
): MenuItem {
  return {
    key,
    icon,
    href,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Quản lý Tour", "/manage/tours", <MdOutlineTour />),
  getItem("Quản lý khách sạn", "/manage/hotels", <MdOutlineHotel />),
  getItem("Quản lý khách hàng", "/manage/customers", <RiCustomerServiceLine />),
];

const SupplierSidebar: FC<Props> = ({}) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    const selected: any = items.find((item) => {
      return item?.key === router.pathname;
    });
    selected && setSelectedKeys([selected?.key]);
  }, []);

  return (
    <div className={styles.container}>
      <Menu
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        selectedKeys={selectedKeys}
        onSelect={(e) => {
          setSelectedKeys([e.key]);
          router.push(e.key);
        }}
      />
    </div>
  );
};

export default memo(SupplierSidebar);
