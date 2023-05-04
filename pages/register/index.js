import AppContext from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import { registerUser, checkUsername, checkEmail } from "../../lib/auth";
import { postFavorite } from "@/lib/favorites";
import Header from "../../components/Header";

const Register = () => {
  const { setUserState } = useContext(AppContext);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // const username = watch("username");
  // console.log(username);

  console.log(registerData.username);
  const username = registerData.username;
  const email = registerData.email;

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

  const handleRegister = () => {
    registerUser(
      registerData.username,
      registerData.email,
      registerData.password
    )
      .then((res) => {
        setUserState(res.data.user);
        postFavorite(res.data.user.id);
        window.location.replace("/");
      })
      .catch((err) => console.log(err.response.data.error.message));
  };

  const handleChange = (e) => {
    console.log("test");
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>SIGN UP</h1>
        <section className={styles.form}>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              type="name"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              // {...register("username")}
            />
            {isUsernameValid && (
              <p className={styles.errorMessage}>
                Username already exists. Please try another username.
              </p>
            )}
          </div>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {isEmailValid && (
              <p className={styles.errorMessage}>
                Email already exists. Please try another email.
              </p>
            )}
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
          <button className={styles.formBtn} onClick={handleRegister}>
            Register
          </button>
        </section>
      </div>
    </div>
  );
};

export default Register;
