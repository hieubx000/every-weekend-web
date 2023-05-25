import { FC, memo } from "react";

import styles from "./style.module.scss";
import classNames from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "full-width";
}

const Button: FC<Props> = ({ children, variant = "primary", ...props }) => {
  return (
    <button {...props} className={classNames([styles.container, styles[variant]])}>
      {children}
    </button>
  );
};

export default memo(Button);
