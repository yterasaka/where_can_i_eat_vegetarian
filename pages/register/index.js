import AppContext from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { registerUser, checkUsername, checkEmail } from "../../lib/auth";
import { postFavorite } from "@/lib/favorites";
import Header from "../../components/Header";

const Register = () => {
  const { setUserState } = useContext(AppContext);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    username: "",
    email: "",
    password: "",
  });
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

  const username = watch("username");
  const email = watch("email");

  useEffect(() => {
    (async () => {
      await checkUsername(username).then((res) => {
        if (res.length) {
          setIsUsernameValid(true);
        } else {
          setIsUsernameValid(false);
        }
      });
    })();
  }, [username]);

  useEffect(() => {
    (async () => {
      await checkEmail(email).then((res) => {
        if (res.length) {
          setIsEmailValid(true);
        } else {
          setIsEmailValid(false);
        }
      });
    })();
  }, [email]);

  const handleRegister = (data) => {
    registerUser(data.username, data.email, data.password)
      .then((res) => {
        setUserState(res.data.user);
        postFavorite(res.data.user.id);
        window.location.replace("/");
      })
      .catch((err) => console.log(err));
  };

  const startComposition = () => setComposing(true);
  const endComposition = () => setComposing(false);

  const onKeydown = (key) => {
    switch (key) {
      case "Enter":
        if (composing) break;
        handleSubmit(handleRegister);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>SIGN UP</h1>
        <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              name="username"
              placeholder="username"
              onKeyDown={(e) => onKeydown(e.key)}
              onCompositionStart={startComposition}
              onCompositionEnd={endComposition}
              {...register("username", {
                required: "Please enter your name",
                minLength: {
                  value: 3,
                  message: "Please enter at least 3 characters.",
                },
              })}
            />
            {isUsernameValid && (
              <p className={styles.errorMessage}>
                Username already exists. Please try another username.
              </p>
            )}
            {errors.username && (
              <p className={styles.errorMessage}>{errors.username?.message}</p>
            )}
          </div>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              name="email"
              placeholder="your@example.com"
              onKeyDown={(e) => onKeydown(e.key)}
              onCompositionStart={startComposition}
              onCompositionEnd={endComposition}
              {...register("email", {
                required: "Please enter your email address",
                pattern: {
                  value:
                    /([a-zA-Z0-9\+_\-]+)(\.[a-zA-Z0-9\+_\-]+)*@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}/,
                  message: "Invalid email address",
                },
              })}
            />
            {isEmailValid && (
              <p className={styles.errorMessage}>
                Email already exists. Please try another email.
              </p>
            )}
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email?.message}</p>
            )}
          </div>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              name="password"
              type={passwordType}
              placeholder="password"
              onKeyDown={(e) => onKeydown(e.key)}
              onCompositionStart={startComposition}
              onCompositionEnd={endComposition}
              {...register("password", {
                required: "Please enter your password",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "The password must be at least 6 characters long and contain at least one letter and one number.",
                },
              })}
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

            {errors.password && (
              <p className={styles.errorMessage}>{errors.password?.message}</p>
            )}
          </div>
          <input type="submit" value="Register" className={styles.formBtn} />
        </form>
      </div>
    </div>
  );
};

export default Register;
