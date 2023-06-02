import AppContext from "@/context/AppContext";
import { useContext } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import styles from "./index.module.css";

const TogglePasswordIcon = () => {
  const { passwordType, setPasswordType } = useContext(AppContext);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    }
    if (passwordType === "text") {
      setPasswordType("password");
    }
  };

  return (
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
  );
};

export default TogglePasswordIcon;
