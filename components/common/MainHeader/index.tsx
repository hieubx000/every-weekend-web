import React, { FC, memo, useRef, useState } from "react";

import styles from "./style.module.scss";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { routerPathConstant } from "@/constants/routerConstant";
import { useRouter } from "next/router";
import { Drawer, Popover } from "antd";
import LinkTo from "../LinkTo";
import defaultConstant from "@/constants/defaultConstant";

import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "@/redux/slice/authSlice";
import useHeader from "@/hooks/Layout/useHeader";
import useOnClickOutside from "@/hooks/useClickOutside";
import { Role } from "@/types/common";
import { convertRoleEnumToName } from "@/utils/converts";

type Props = {};

const MainHeader: FC<Props> = () => {
  const {
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
  } = useHeader();

  const renderAuthorization = () =>
    role !== Role.guest ? (
      <div className={styles.header_auth}>
        <div className={styles.customer} ref={accountDropdownRef}>
          <div
            className={styles.information_inner}
            onClick={() => setDropdown(!dropdown)}>
            <div className={styles.avatar}>
              <img
                src={defaultConstant.defaultAvatarUser}
                className="object-fit-cover"
                alt=""
                width="40"
                height="40"
              />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>profile name</div>
              <div className={styles.role}>{convertRoleEnumToName(role)}</div>
            </div>
            <div style={{ color: "var(--white-color)", paddingRight: ".5rem" }}>
              <BsChevronDown size={20} />
            </div>
          </div>

          <div className={styles.information_avatar}>
            <div onClick={() => setRightAuthDrawer(!rightAuthDrawer)}>
              <img
                src={defaultConstant.defaultAvatarUser}
                className="object-fit-cover"
                alt=""
                width="40"
                height="40"
              />
            </div>

            <Drawer
              className={styles.draw_auth_right}
              visible={rightAuthDrawer}
              width="75%"
              placement="right"
              key="right"
              closable={false}
              onClose={() => setRightAuthDrawer(false)}>
              <div className={styles.information_dropdown}>
                <div className={styles.information}>
                  <div className={styles.img}>
                    <img alt="" src={defaultConstant.defaultAvatarUser} />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>profile name</div>
                    {/* {profile.verifyKyc ? ( */}
                    {true ? (
                      <div className={styles.verify}>
                        <img alt="" src="/assets/icons/color/isVerified.svg" />
                        &nbsp;
                        <span>Tài khoản đã được xác thực</span>
                      </div>
                    ) : (
                      <div className={styles.verify}>
                        <img alt="" src="/assets/icons/color/unVerified.svg" />
                        &nbsp;
                        <span>Tài khoản chưa được xác thực</span>
                      </div>
                    )}
                    <div className={styles.diamond}>
                      {/* <span>{formatDiamond(profile.walletValue)}</span> */}
                      &nbsp;
                      <img src="/assets/icons/color/diamond.svg" alt="" />
                    </div>
                  </div>
                </div>

                {accountMenu.map((arr, idx) => (
                  <div key={idx} className={styles.list}>
                    {arr.map((item) => (
                      <div
                        key={item.id}
                        className={styles.item}
                        // onClick={() => setDropdown(false)}
                      >
                        <div className={styles.popup}>
                          <div className={styles.text}>
                            <img alt="" src={item.src} />
                            <span>{item.title}</span>
                          </div>
                          {/* <RightOutlined /> */}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Drawer>
          </div>

          {dropdown && (
            <div className={styles.information_dropdown}>
              <div className={styles.information}>
                <div className={styles.img}>
                  <img
                    width="50"
                    height="50"
                    className="object-fit-cover"
                    alt=""
                    src={defaultConstant.defaultAvatarUser}
                  />
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>profile name</div>
                  {/* {profile.verifyKyc ? ( */}
                  {true ? (
                    <div className={styles.verify}>
                      <img alt="" src="/assets/icons/color/isVerified.svg" />
                      &nbsp;
                      <span>Tài khoản đã được xác thực</span>
                    </div>
                  ) : (
                    <div className={styles.verify}>
                      <img alt="" src="/assets/icons/color/unVerified.svg" />
                      &nbsp;
                      <span>Tài khoản chưa được xác thực</span>
                    </div>
                  )}
                  <div className={styles.diamond}>
                    {/* <span>{formatDiamond(profile.walletValue)}</span> */}
                    &nbsp;
                    <img src="/assets/icons/color/diamond.svg" alt="" />
                  </div>
                </div>
              </div>

              {accountMenu.map((arr, idx) => (
                <div key={idx} className={styles.list}>
                  {arr.map((item) => (
                    <div
                      key={item.id}
                      className={styles.item}
                      // onClick={() => setDropdown(false)}
                    >
                      <div className={styles.popup}>
                        <div className={styles.text}>
                          <img alt="" src={item.src} />
                          <span>{item.title}</span>
                        </div>
                        <BsChevronRight />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ) : (
      <div>guest</div>
    );

  return (
    <div className={`header ${styles.header}`}>
      <div className={styles.header_wrap}>
        <div className={styles.header_left}>
          <div className={styles.header_drawer}>
            <div className={styles.icon} onClick={() => setLeftDrawer(true)}>
              <img alt="" src="/assets/icons/header/more-white.svg" />
            </div>
            <Drawer
              className={styles.draw_left}
              visible={leftDrawer}
              width="75%"
              placement="left"
              key="left"
              closable={false}
              onClose={() => setLeftDrawer(false)}>
              <div className={styles.logo}>
                <LinkTo href="/" onClick={() => setLeftDrawer(false)}>
                  <img src="/assets/icons/header/logo.svg" alt="" />
                </LinkTo>
              </div>
              <div className={styles.navigator}>
                {headerMenu.map((item, i) => (
                  <LinkTo href={item.href} className={styles.menu} key={i}>
                    <span>{item.text}</span>
                  </LinkTo>
                ))}
              </div>
            </Drawer>
          </div>

          <div className={styles.header_logo}>
            <LinkTo href="/">
              <img
                src="/assets/images/logo.png"
                alt="Việc làm Fjob"
                title="Việc làm Fjob"
              />
            </LinkTo>
          </div>

          <div className={styles.header_navigator}>
            {headerMenu.map((item, i) => (
              <div className={styles.menu} key={i}>
                {/* {!item.children ? ( */}
                <LinkTo href={item.href} className={styles.link}>
                  {item.text}
                </LinkTo>
                {/* ) : (
                  <Popover
                    placement="bottom"
                    content={
                      <div>
                        <div className={styles.link_popover}>
                          <a href="/blogs?type=employer">Cho nhà tuyển dụng</a>
                        </div>
                        <div className={styles.link_popover}>
                          <a href="/blogs?type=employee">Cho ứng viên</a>
                        </div>
                      </div>
                    }>
                    <div className={styles.link}>
                      <a>{item.text}</a>
                    </div>
                  </Popover>
                )} */}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.header_right}>{renderAuthorization()}</div>
      </div>
      {/* {isShowModalApp && <ModalQRDownload callbackCloseModalApp={() => setIsShowModalApp(false)} />}
      {isShowModalChangePass && <ModalChangePass callbackCloseModalApp={() => setIsShowModalChangePass(false)} />} */}
    </div>
  );
};

export default memo(MainHeader);
