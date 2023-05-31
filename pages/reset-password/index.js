import { useContext, useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { resetPwd } from "../../lib/auth";
import Header from "../../components/Header";
import TogglePassword from "@/components/TogglePassword";
import AppContext from "@/context/AppContext";

const ResetPwd = () => {
  const router = useRouter();
  const [pwd, setPwd] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const { passwordType } = useContext(AppContext);

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
    <div className={styles.body}>
      <Header />
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Reset password</h1>
        <div className={styles.form}>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              type={passwordType}
              id="password"
              name="password"
              placeholder="Password"
              autoFocus={true}
              onChange={handleChange}
            />
            <TogglePassword />
          </div>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              type={passwordType}
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Password confirmation"
              onChange={handleChange}
            />
            <TogglePassword />
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
