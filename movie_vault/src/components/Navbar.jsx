import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { pathname } = useLocation(); //current page path

  return (
    <nav className={styles.navbar}>
      {/* logo */}
      <Link to="/" className={styles.logo}>
        DELI | <span>VAULT</span>
      </Link>
      {/* links */}
      <div className={styles.links}>
        <Link
          to="/"
          className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        >
          DISCOVER
        </Link>
        <Link
          to="/favorites"
          className={`${styles.link} ${pathname === "/favorites" ? styles.active : ""}`}
        >
          FAVORITES
        </Link>
      </div>
      {/* signup and login buttons */}
      <div className={styles.auth}>
        <Link to="/login" className={styles.loginBtn}>
          Sign In
        </Link>
        <Link to="/register" className={styles.registerBtn}>
          Get Started
        </Link>
      </div>
    </nav>
  );
}
