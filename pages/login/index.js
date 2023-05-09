import AppContext from "@/context/AppContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import { login } from "../../lib/auth";
import Header from "../../components/Header";

const Login = () => {
  const { setUserState } = useContext(AppContext);
  const { register, handleSubmit } = useForm({
    identifier: "",
    password: "",
  });
  const [isInputValid, setIsInputValid] = useState(false);
  const [composing, setComposing] = useState(false);

  const handleLogin = (data) => {
    login(data.identifier, data.password)
      .then((res) => {
        setUserState(res.data.user);
        window.location.replace("/");
      })
      .catch((err) => {
        setIsInputValid(true);
      });
  };

  const startComposition = () => setComposing(true);
  const endComposition = () => setComposing(false);

  const onKeydown = (key) => {
    switch (key) {
      case "Enter":
        if (composing) break;
        handleSubmit(handleLogin);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>LOG IN</h1>
        <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              name="identifier"
              placeholder="Username or Email"
              onKeyDown={(e) => onKeydown(e.key)}
              onCompositionStart={startComposition}
              onCompositionEnd={endComposition}
              {...register("identifier")}
            />
          </div>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              name="password"
              placeholder="Password"
              onKeyDown={(e) => onKeydown(e.key)}
              onCompositionStart={startComposition}
              onCompositionEnd={endComposition}
              {...register("password")}
            />
          </div>
          {isInputValid && (
            <p className={styles.errorMessage}>
              Incorrect username, email, or password. Please try again.
            </p>
          )}
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
        </form>
      </div>
    </div>
  );
};

export default Login;
