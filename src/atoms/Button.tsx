import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder: string;
}

function Button({ placeholder, ...otherProps }: IButtonProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button type="button" className={styles.Button} {...otherProps}>
      {placeholder}
    </button>
  );
}

export default Button;
