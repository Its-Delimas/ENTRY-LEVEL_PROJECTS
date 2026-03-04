// src/components/ui/Input.jsx

import styles from "./Input.module.css";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error, // error message string — shows below input
  icon, // optional icon on the left
}) {
  return (
    <div className={styles.wrapper}>
      {/* Label sits above the input */}
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
        {/* Optional left icon */}
        {icon && <span className={styles.icon}>{icon}</span>}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            ${styles.input}
            ${icon ? styles.withIcon : ""}
            ${error ? styles.hasError : ""}
          `}
        />
      </div>

      {/* Error message — only shows when error prop exists */}
      {error && <p className={styles.error}>⚠ {error}</p>}
    </div>
  );
}
