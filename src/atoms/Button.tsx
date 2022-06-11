import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./button.module.css";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder: string;
  color?: "primary" | "danger";
}

function Button({ placeholder, color = "primary", ...otherProps }: IButtonProps) {
  const buttonStyles = classNames({
    [styles.Button]: true,
    [styles["Button--primary"]]: color === "primary",
    [styles["Button--danger"]]: color === "danger",
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button type="button" className={buttonStyles} {...otherProps}>
      {placeholder}
    </button>
  );
}

export default Button;
