import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { resetPwd } from "../../lib/auth";
import Header from "../../components/Header";

const ResetPwd = () => {
  const router = useRouter();
  const [pwd, setPwd] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const handleResetPwd = () => {
    const { code } = router.query;
    resetPwd(code, pwd.password, pwd.passwordConfirmation);
    router.push("/login");
    alert("Your password has been reset. Please login again.");
  };

  const handleChange = (e) => {
    setPwd({ ...pwd, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Reset password</h1>
        <p className={styles.message}>Please set a new password.</p>
        <div className={styles.form}>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Password confirmation"
              onChange={handleChange}
            />
          </div>
          <button className={styles.formBtn} onClick={handleResetPwd}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPwd;
