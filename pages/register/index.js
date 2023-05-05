import AppContext from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.css";
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

  const username = watch("username");
  const email = watch("email");

  useEffect(() => {
    const result = async () => {
      const result = await checkUsername(username).then((res) => {
        if (res.length) {
          setIsUsernameValid(true);
        } else {
          setIsUsernameValid(false);
        }
      });
    };
    result();
  }, [username]);

  useEffect(() => {
    const result = async () => {
      const result = await checkEmail(email).then((res) => {
        if (res.length) {
          setIsEmailValid(true);
        } else {
          setIsEmailValid(false);
        }
      });
    };
    result();
  }, [email]);

  const handleRegister = (data) => {
    console.log("name", data.username);
    console.log("email", data.email);
    console.log("password", data.password);

    registerUser(data.username, data.email, data.password)
      .then((res) => {
        setUserState(res.data.user);
        postFavorite(res.data.user.id);
        window.location.replace("/");
      })
      .catch((err) => console.log(err.response.data.error.message));
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
              placeholder="password"
              {...register("password", {
                required: "Please enter your password",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "The password must be at least 6 characters long and contain at least one letter and one number.",
                },
              })}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password?.message}</p>
            )}
          </div>
          <button className={styles.formBtn} onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
