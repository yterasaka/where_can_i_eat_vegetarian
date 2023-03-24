import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

// 新規ユーザー登録
// TODO: Promiseを使わない方法も考える
export const registerUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/api/auth/local/register`, {
        username,
        email,
        password, // パスワードは最低6文字以上でないとステータス400が返ってくる仕様のよう
      })
      .then((res) => {
        Cookies.set("token", res.data.jwt, { expires: 7 });
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        console.log("An error occurred:", err);
      });
  });
};

// ログイン
export const login = (identifier, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/api/auth/local`, {
        identifier,
        password,
      })
      .then((res) => {
        Cookies.set("token", res.data.jwt, { expires: 7 });
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        console.log("An error occurred:", err);
      });
  });
};

// ユーザーの削除
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/users/${userId}`);
    console.log("User deleted", response.data);
  } catch (err) {
    console.error("Error deleting user", err);
  }
};

// ユーザー名とメールアドレスの変更
export const changeUserInfo = async (userId, username, email) => {
  try {
    const response = await axios.put(`${API_URL}/api/users/${userId}`, {
      username,
      email,
    });
    console.log("User information changed", response.data);
  } catch (err) {
    console.error("Error changing user", err);
  }
};

// パスワードの変更
export const changePwd = async (
  currentPassword,
  password,
  passwordConfirmation
) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.post(
      `${API_URL}/api/auth/change-password`,
      {
        currentPassword,
        password,
        passwordConfirmation,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Password changed", response.data);
    alert("Password change succeeded.");
  } catch (err) {
    console.error("Error changing password", err);
    alert("Password change failed.");
  }
};

// パスワードリセット用のメールを送信
export const sendEmail = async (email) => {
  await axios
    .post(`${API_URL}/api/auth/forgot-password`, {
      email,
    })
    .then((response) => {
      console.log("Your user received an email");
    })
    .catch((error) => {
      console.log("An error occurred:", error.response);
    });
};

// パスワードをリセット
export const resetPwd = async (code, password, passwordConfirmation) => {
  await axios
    .post(`${API_URL}/api/auth/reset-password`, {
      code,
      password,
      passwordConfirmation,
    })
    .then((response) => {
      console.log("Your user's password has been reset.");
    })
    .catch((error) => {
      console.log("An error occurred:", error.response);
    });
};
