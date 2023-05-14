import { FC, memo } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from "./style.module.scss";
import classNames from "classnames";

type Props = {};

const mockData = {
  phoneNumber: "(+84) 963 626 914",
  email: "buixuanhieutn@gmail.com",
};

const TopBar: FC<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <div
          className={classNames([
            styles.contact__item,
            styles.contact__item__bdRight,
          ])}>
          <AiOutlinePhone size={20} /> {mockData.phoneNumber}
        </div>
        <div className={styles.contact__item}>
          <FiMail size={20} /> {mockData.email}
        </div>
      </div>
      <div className={styles.social}>
        <div className={styles.social__item}>
          <FaFacebookF />
        </div>
        <div className={styles.social__item}>
          <FaTwitter />
        </div>
        <div className={styles.social__item}>
          <FaInstagram />
        </div>
        <div>
          <FaYoutube />
        </div>
      </div>
    </div>
  );
};

export default memo(TopBar);
