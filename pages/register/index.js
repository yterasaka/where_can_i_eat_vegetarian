import AppContext from "@/context/AppContext";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styles from "./index.module.css";
import { registerUser } from "../../lib/auth";

const Register = () => {
  const router = useRouter();
  const { setUserState } = useContext(AppContext);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = () => {
    registerUser(
      registerData.username,
      registerData.email,
      registerData.password
    )
      .then((res) => {
        setUserState(res.data.user);
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
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
          />
        </div>
        <div className={styles.formItem}>
          <input
            className={styles.formInput}
            type="email"
            name="email"
            placeholder="Email"
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
        <button className={styles.formBtn} onClick={handleRegister}>
          Register
        </button>
      </section>
    </div>
  );
};

export default Register;
