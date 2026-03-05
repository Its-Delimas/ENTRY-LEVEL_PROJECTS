import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import styles from "./Auth.module.css";

export default function Login() {
  const navigate = useNavigate(""); //lest us redirect programmatically

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // validation
  function validate() {
    const err = {};

    if (!email.trim()) {
      err.email = "Email is Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.email = "Enter a valid email address";
    }

    if (!password) {
      err.password = "Password isn required";
    } else if (password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }
    return err;
  }
  // submit
  async function handleSubmit() {
    const err = validate();
    if (Object.keys(err).length > 0) {
      setError(err);
      return;
    }
    setLoading(true);
    setError({});
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // store fake token
      localStorage.setItem("token", "fake-token-123");
      localStorage.setItem("user", JSON.stringify({ email, name: "User" }));
      navigate("/");
    } catch (err) {
      setError({ general: "Invalid Email or Password" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.logo}>
            DELI<span>VAULT</span>
          </h1>
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>Sign in to your account to continue</p>
        </div>
        {/* General error */}
        {error.general && (
          <div className={styles.generalError}>🚩{error.general}</div>
        )}

        <div className={styles.form}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johnDoe@gmail.com"
            error={error.email}
            icon="✉"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={error.password}
            icon="🔒"
          />
          <div className={styles.forgot}>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <Button fullWidth loading={loading} onClick={handleSubmit} size="lg">
            Sign In
          </Button>
          <div className={styles.divider}>
            <span>or</span>
          </div>
          <p className={styles.switchText}>
            Don't have an account?{" "}
            <Link to="/register" className={styles.switchLink}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
