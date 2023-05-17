import AppContext from "@/context/AppContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
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
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    }
    if (passwordType === "text") {
      setPasswordType("password");
    }
  };

  const handleLogin = (data) => {
    login(data.identifier, data.password)
      .then((res) => {
        setUserState(res.data.user);
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
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
              autoFocus={true}
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
              type={passwordType}
              placeholder="Password"
              onKeyDown={(e) => onKeydown(e.key)}
              onCompositionStart={startComposition}
              onCompositionEnd={endComposition}
              {...register("password")}
            />

            <span onClick={togglePassword} className={styles.passwordReveal}>
              {passwordType === "password" && (
                <i>
                  <HiOutlineEyeOff className={styles.passwordIcon} />
                </i>
              )}
              {passwordType === "text" && (
                <i className="passwordIcon">
                  <HiOutlineEye className={styles.passwordIcon} />
                </i>
              )}
            </span>
          </div>

          {isInputValid && (
            <p className={styles.errorMessage}>
              Incorrect username, email, or password. Please try again.
            </p>
          )}
          <div>
            <input type="submit" value="Login" className={styles.formBtn} />
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
