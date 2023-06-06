import { routerPathConstant } from "@/constants/routerConstant";
import { useRouter } from "next/router";
import { useMemo, useCallback, useState, useRef } from "react";
import useOnClickOutside from "../useClickOutside";
import { Role } from "@/types/common";

const useHeader = () => {
  const [leftDrawer, setLeftDrawer] = useState(false);
  const [rightAuthDrawer, setRightAuthDrawer] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [role] = useState(Role.customer);
  const accountDropdownRef = useRef(null);
  const router = useRouter();
  useOnClickOutside({
    ref: accountDropdownRef,
    handler: () => setDropdown(false),
  });

  const headerMenu = useMemo(() => {
    return role === Role.customer
      ? [
          {
            text: "Điểm đến",
            href: routerPathConstant.homepage,
            active: router.pathname.includes(routerPathConstant.homepage),
          },
          {
            text: "Dịch vụ",
            href: "",
            active: router.pathname.includes(routerPathConstant.homepage),
            children: [
              {
                text: "Tour du lịch",
                href: routerPathConstant.tours,
                active: router.pathname.includes(routerPathConstant.tours),
              },
              {
                text: "Khách sạn",
                href: routerPathConstant.hotels,
                active: router.pathname.includes(routerPathConstant.hotels),
              },
              {
                text: "Vé máy bay",
                href: routerPathConstant.homepage,
                active: router.pathname.includes(routerPathConstant.homepage),
              },
            ],
          },
          {
            text: "Blog",
            href: routerPathConstant.homepage,
            active: router.pathname.includes(routerPathConstant.homepage),
          },
          {
            text: "Liên hệ",
            href: routerPathConstant.homepage,
            active: router.pathname.includes(routerPathConstant.homepage),
          },
        ]
      : [];
  }, [routerPathConstant, router]);

  const accountMenu = useMemo(() => {
    return role === Role.customer
      ? [
          [
            {
              id: routerPathConstant.homepage,
              src: "/assets/icons/header/user.svg",
              title: "Thông tin tài khoản",
              link: routerPathConstant.account,
            },
            {
              id: routerPathConstant.homepage,
              src: "/assets/icons/header/booking.svg",
              title: "Theo dõi đơn đặt chỗ",
              link: routerPathConstant.homepage,
            },

            {
              id: routerPathConstant.homepage,
              src: "/assets/icons/header/money.svg",
              title: "Thông tin thanh toán",
              link: routerPathConstant.homepage,
            },
          ],
          [
            {
              id: routerPathConstant.homepage,
              src: "/assets/icons/header/favorite.svg",
              title: "Danh sách yêu thích",
              link: routerPathConstant.homepage,
            },
            {
              id: routerPathConstant.homepage,
              src: "/assets/icons/header/promotion.svg",
              title: "Ưu đãi của bạn",
              link: routerPathConstant.homepage,
            },
            {
              id: routerPathConstant.homepage,
              src: "/assets/icons/header/blog.svg",
              title: "Quản lý Blog",
              link: routerPathConstant.homepage,
            },
          ],
          [
            {
              id: routerPathConstant.homepage,
              src: "/assets/icons/header/supplier.svg",
              title: "Chế độ nhà cung cấp",
              link: routerPathConstant.homepage,
            },
            {
              id: "",
              src: "/assets/icons/header/change_password.svg",
              title: "Thay đổi mật khẩu",
              link: "",
            },
            {
              id: routerPathConstant.homepage,
              src: "/assets/icons/header/logout.svg",
              title: "Đăng xuất",
              link: "",
            },
          ],
        ]
      : [];
  }, [routerPathConstant]);

  const onClickItemDrawer = useCallback((url: string) => {
    setDropdown(false);
    router.push(url);
  }, []);

  return {
    role,
    accountDropdownRef,
    headerMenu,
    accountMenu,
    leftDrawer,
    rightAuthDrawer,
    dropdown,
    setLeftDrawer,
    setRightAuthDrawer,
    setDropdown,
    onClickItemDrawer,
  };
};

export default useHeader;
