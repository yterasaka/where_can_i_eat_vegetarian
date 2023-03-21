import AppContext from "@/context/AppContext";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "./index.module.css";
import { changeUserInfo, changePwd } from "../../lib/auth";

const UserInfo = () => {
  const { userState, setUserState } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const [pwd, setPwd] = useState({
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  // ユーザー名とメールアドレスの編集処理
  const handleEdit = () => {
    setIsEdit(true);
    setUserData({
      username: userState.username,
      email: userState.email,
    });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    changeUserInfo(userState.id, userData.username, userData.email)
      .then(() => {
        setUserState({
          ...userState,
          username: userData.username,
          email: userData.email,
        });
        setIsEdit(false);
        alert("User information has been changed.");
      })
      .catch((err) => console.log(err));
  };

  const handleBack = () => setIsEdit(false);

  // パスワードの変更処理
  const handleEditPwd = () => {
    setIsPwd(true);
  };

  const handleChangePwd = (e) => {
    setPwd({ ...pwd, [e.target.name]: e.target.value });
  };

  const handleApplyPwd = () => {
    changePwd(pwd.currentPassword, pwd.password, pwd.passwordConfirmation)
      .then(() => {
        setPwd({
          currentPassword: "",
          password: "",
          passwordConfirmation: "",
        });
        setIsPwd(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>User Information</h1>
      {isEdit ? (
        <div className={styles.form}>
          <div className={styles.formItem}>
            <h5 className={styles.itemName}>Name</h5>
            <input
              className={styles.formInput}
              type="text"
              id="name"
              name="username"
              value={userData.username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={styles.formItem}>
            <h5 className={styles.itemName}>Email</h5>
            <input
              className={styles.formInput}
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className={styles.formBtn} onClick={handleApply}>
            Apply
          </button>
          <br />
          <button className={styles.editBtn} onClick={handleBack}>
            Back
          </button>
        </div>
      ) : (
        <div className={styles.form}>
          <h5 className={styles.itemName}>Name</h5>
          <div className={styles.itemText}>{userState?.username}</div>
          <h5 className={styles.itemName}>Email</h5>
          <div className={styles.itemText}>{userState?.email}</div>

          <button className={styles.editBtn} onClick={handleEdit}>
            Edit
          </button>
        </div>
      )}

      <br />
      <div>
        {isPwd ? (
          <div className={styles.form}>
            <div className={styles.itemName}>
              <input
                className={styles.formInput}
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Current password"
                onChange={(e) => handleChangePwd(e)}
              />
            </div>
            <div className={styles.itemName}>
              <input
                className={styles.formInput}
                type="password"
                id="password"
                name="password"
                placeholder="New password"
                onChange={(e) => handleChangePwd(e)}
              />
            </div>
            <div className={styles.itemName}>
              <input
                className={styles.formInput}
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Password confirmation"
                onChange={(e) => handleChangePwd(e)}
              />
            </div>
            <button className={styles.formBtn} onClick={handleApplyPwd}>
              Apply
            </button>
          </div>
        ) : (
          <button className={styles.formBtnPwd} onClick={handleEditPwd}>
            Change password?
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
