import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// TODO: React 19 permet de passer ref directement comme prop
// (sans forwardRef). À migrer quand le pattern sera plus établi.
// Voir : https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <button ref={ref} className={styles.button} {...props} />;
});

Button.displayName = "Button";

export default Button;
