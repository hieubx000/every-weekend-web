import React, { FC } from "react";
import { useRouter } from "next/router";
import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { blogCategory } from "@/utils/initData";

import styles from "./style.module.scss";

const Footer = (): JSX.Element => {
  const router = useRouter();
  const redirectPage = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.information}>
            <div className={styles.info}>
              <div className={styles.item}>
                <PhoneOutlined />
                <div className={styles.number}>
                  <a href="tel:096 3626914">096 3626914</a>
                </div>
              </div>
              <div className={styles.item}>
                <MailOutlined />
                <div className={styles.description}>
                  <a href="mailto:buixuanhieutn@gmail.com">
                    buixuanhieutn@gmail.com
                  </a>
                </div>
              </div>
              <div className={styles.item}>
                <HomeOutlined />
                <div className={styles.description}>
                  175, Tây Sơn, Trung Liệt, Đống Đa, Hà Nội
                </div>
              </div>
            </div>
          </div>
          <div className={styles.link}>
            <div className={styles.aboutus}>
              <h3>Về Every Weekend</h3>
              <div className={styles.child}>
                <div className={styles.item} onClick={() => redirectPage("/")}>
                  Về chúng tôi
                </div>
                <div className={styles.item} onClick={() => redirectPage("/")}>
                  Trợ giúp
                </div>
                <div className={styles.item} onClick={() => redirectPage("/")}>
                  Liên hệ
                </div>
              </div>
            </div>
            <div className={styles.help}>
              <h3>Hỗ trợ</h3>
              <div className={styles.child}>
                <div className={styles.item} onClick={() => redirectPage("/")}>
                  Hướng dẫn
                </div>
                <div className={styles.item} onClick={() => redirectPage("/")}>
                  Điều khoản dịch vụ
                </div>
                <div className={styles.item} onClick={() => redirectPage("/")}>
                  Chính sách bảo mật
                </div>
              </div>
            </div>
            <div className={styles.manual}>
              <h3>Blog</h3>
              <div className={styles.child}>
                {blogCategory.map((item, index) => (
                  <div
                    key={index}
                    className={styles.item}
                    onClick={() => redirectPage("/")}>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.brand}>
          <div className={styles.inner}>
            <div className={styles.social}>
              <img
                alt=""
                src="/assets/icons/footer/facebook.svg"
                onClick={() =>
                  window.open("https://www.facebook.com/iamhieu.20")
                }
              />
              <img
                alt=""
                src="/assets/icons/footer/youtube.svg"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/channel/UCuc0Fu9d7seYnlXws1orOFQ",
                  )
                }
              />
              <img
                alt=""
                src="/assets/icons/footer/instagram.svg"
                onClick={() =>
                  window.open("https://www.instagram.com/iamhieu.20/")
                }
              />
              <img
                alt=""
                src="/assets/icons/footer/twitter.svg"
                onClick={() => window.open("https://twitter.com/iamhieu20")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.inner}>
          <span>Copyright © Tổng công ty du lịch Every Weekend</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
