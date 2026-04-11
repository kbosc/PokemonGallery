import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <button ref={ref} className={styles.button} {...props} />;
});

Button.displayName = "Button";

export default Button;
