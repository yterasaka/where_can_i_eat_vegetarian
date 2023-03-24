import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { sendEmail } from "../../lib/auth";
import Header from "../../components/Header";

const ForgottenPwd = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSendEmail = () => {
    sendEmail(email);
    router.push("/");
    alert("A password reset email has been sent.");
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Forgot password</h1>
        <p className={styles.message}>
          Enter your email to reset your password.
        </p>
        <div className={styles.form}>
          <div className={styles.formItem}>
            <input
              className={styles.formInput}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            ></input>
          </div>
          <button className={styles.formBtn} onClick={handleSendEmail}>
            Reset password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgottenPwd;
