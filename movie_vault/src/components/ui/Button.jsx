import styles from "./Button.module.css";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.btn}
            ${styles[variant]}
            ${styles[size]}
            ${fullWidth ? styles.fullWidth : ""}      
            ${loading ? styles.loading : ""}
      `}
    >
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
}
