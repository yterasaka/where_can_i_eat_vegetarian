import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

// お気に入りの新規作成
export const postFavorite = async (id) => {
  const data = {
    restaurants: null,
    user: {
      id,
    },
  };

  try {
    const response = await axios.post(`${API_URL}/api/favorites`, {
      data,
    });
    console.log("Data posted:", response.data);
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

// お気に入りの更新
export const updateFavorite = async (id, favorites) => {
  try {
    const response = await axios.put(`${API_URL}/api/favorites/${id}`, {
      favorites,
    });
    console.log("Data updated:", response.data);
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

// ログインしているユーザーのお気に入りリストを取得
export const getFavorite = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${id}?populate=*`);
    console.log("Data gotten:", response.data);
    return response;
  } catch (error) {
    console.error("Error getting data:", error);
  }
};
