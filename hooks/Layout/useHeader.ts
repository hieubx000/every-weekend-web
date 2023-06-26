import { routerPathConstant } from "@/constants/routerConstant";
import { useRouter } from "next/router";
import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import useOnClickOutside from "../useClickOutside";
import { User } from "@/types/common";
import { Role } from "@/types/commonTypes";
import { authStorage } from "@/storage/authStorage";
import useUserProfile from "../useUserProfile";

const useHeader = () => {
  const [leftDrawer, setLeftDrawer] = useState(false);
  const [rightAuthDrawer, setRightAuthDrawer] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const { userRole, userProfile, userToken } = useUserProfile();

  const accountDropdownRef = useRef(null);
  const router = useRouter();

  useOnClickOutside({
    ref: accountDropdownRef,
    handler: () => setDropdown(false),
  });

  const headerMenu = useMemo(() => {
    return userRole === Role.customer
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
            href: routerPathConstant.blogs,
            active: router.pathname.includes(routerPathConstant.blogs),
          },
          {
            text: "Liên hệ",
            href: routerPathConstant.homepage,
            active: router.pathname.includes(routerPathConstant.homepage),
          },
        ]
      : [];
  }, [routerPathConstant, router, userRole]);

  const onLogout = useCallback(() => {
    authStorage.clearDataStorage();
    router.replace("/login");
  }, []);

  const onChangeRoleToCustomer = useCallback(() => {
    authStorage.setUserProfile({
      role: Role.customer,
      token: userToken,
      profile: userProfile,
    });
    router.push("/");
  }, [userToken, userProfile]);

  const onChangeRoleToSupplier = useCallback(() => {
    authStorage.setUserProfile({
      role: Role.supplier,
      token: userToken,
      profile: userProfile,
    });
    router.push("/manage/tours");
  }, [userToken, userProfile]);

  const onClickItemDrawer = useCallback((url: string) => {
    setDropdown(false);
    router.push(url);
  }, []);

  const onClickItemHeader = useCallback((url: string) => {
    router.push(url);
  }, []);

  const accountMenu = useMemo(() => {
    return userRole == Role.customer
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
              title: "Theo dõi đơn đặt tour",
              link: routerPathConstant.myBookingTour,
            },
            {
              id: routerPathConstant.homepage,
              src: "/assets/icons/header/booking.svg",
              title: "Theo dõi đơn đặt khách sạn",
              link: routerPathConstant.myBookingHotel,
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
              link: routerPathConstant.myBlog,
            },
          ],
          [
            // {
            //   id: routerPathConstant.homepage,
            //   src: "/assets/icons/header/supplier.svg",
            //   title: "Chế độ nhà cung cấp",
            //   link: routerPathConstant.homepage,
            //   onClickItem: onChangeRoleToSupplier,
            // },
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
              onClickItem: onLogout,
            },
          ],
        ]
      : [
          [
            // {
            //   id: routerPathConstant.homepage,
            //   src: "/assets/icons/header/supplier.svg",
            //   title: "Chế độ khách hàng",
            //   link: routerPathConstant.homepage,
            //   onClickItem: onChangeRoleToCustomer,
            // },
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
              onClickItem: onLogout,
            },
          ],
        ];
  }, [routerPathConstant, userRole]);

  return {
    userProfile,
    userRole,
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
    onClickItemHeader,
  };
};

export default useHeader;
