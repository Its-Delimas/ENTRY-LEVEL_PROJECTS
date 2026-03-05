import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import styles from "./Auth.module.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const err = {};

    if (!name.trim()) {
      err.name = "Name is Required";
    }
    if (!email.trim()) {
      err.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.email = "Invalid Email Address";
    }

    if (!password) {
      err.password = "Password is required";
    } else if (password.length < 6) {
      err.password = "password must be at least 6 charatcers";
    }

    if (!confirm) {
      err.confirm = "Please Confirm Your Password";
    } else if (confirm !== password) {
      err.confirm = "passwords do not match";
    }
    return err;
  }
  async function handleSubmit() {
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      localStorage.setItem("token", "fake-token-123");
      localStorage.setItem("user", JSON.stringify({ email, name }));
      navigate("/");
    } catch (err) {
      setErrors({ general: "Registration Failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.logo}>
            DELI<span>VAULT</span>
          </h1>
          <h2 className={styles.title}>Create an account</h2>
          <p className={styles.subtitle}>
            Join DeliVault and start discovering
          </p>
        </div>

        {errors.general && (
          <div className={styles.generalError}>⚠ {errors.general}</div>
        )}

        <div className={styles.form}>
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            error={errors.name}
            icon="👤"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={errors.email}
            icon="✉"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={errors.password}
            icon="🔒"
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            error={errors.confirm}
            icon="🔒"
          />

          <Button fullWidth loading={loading} onClick={handleSubmit} size="lg">
            Create Account
          </Button>
        </div>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <p className={styles.switchText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.switchLink}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
