import AppContext from "@/context/AppContext";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "./index.module.css";
import { login } from "../../lib/auth";
import Header from "../../components/Header";

const Login = () => {
  const { setUserState } = useContext(AppContext);
  const [loginData, setLoginData] = useState({ identifier: "", password: "" });

  const handleLogin = () => {
    login(loginData.identifier, loginData.password)
      .then((res) => {
        setUserState(res.data.user);
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Incorrect email address or password.");
      });
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>LOG IN</h1>
        <section className={styles.form}>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              type="email"
              name="identifier"
              placeholder="Username or Email"
              onChange={handleChange}
            />
          </div>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button className={styles.formBtn} onClick={handleLogin}>
              Login
            </button>
          </div>

          <div className={styles.formLinkContainer}>
            <Link href="/forgotten-password">
              <p className={styles.formLink}>Forgot Password?</p>
            </Link>
            <Link href="/register">
              <p className={styles.formLink}>Don&apos;t have an account yet?</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
