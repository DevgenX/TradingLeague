import axios from "axios";
import { devApiUrl } from "../config.json";

const url =
  process.env.NODE_ENV === "production" ? "/api/users" : `${devApiUrl}/users`;

export const registerUser = async (data) => {
  const res = axios.post(`${url}/register`, data);

  return res;
};

export const getUser = async (wallet, sig) => {
  const res = axios.post(`${url}/?wallet=${wallet}&sig=${sig}`);

  return res;
};

export const getUserEmail = async (token) => {
  const res = axios.get(`${url}/logged_in/${token}`);

  return res;
};

export const getProfile = async (id, token) => {
  const res = axios.get(`${url}/user_profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getFollowing = async (id, token) => {
  const res = axios.get(`${url}/following/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const loginUser = async (wallet, sig) => {
  const res = axios.post(`${url}/login_wallet?wallet=${wallet}&sig=${sig}`);

  return res;
};

export const loginEmail = async (data) => {
  const res = axios.post(`${url}/login_email`, data);

  return res;
};

export const createUser = async (wallet, sig) => {
  const res = axios.post(`${url}/create`, { wallet, sig });

  return res;
};

export const updateUser = async (id, user, token) => {
  const res = axios.patch(`${url}/update/${id}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const updateWallet = async (id, wallet, token) => {
  const res = axios.patch(`${url}/update_wallet/${id}`, wallet, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const updateMMR = async (id, mmr, token) => {
  const res = axios.patch(
    `${url}/update/mmr/${id}`,
    { mmr },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
};

export const disconnectUser = async (token) => {
  axios({
    method: "post",
    url: `${url}/disconnect`,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const uploadProfilePic = async (id, data, token) => {
  const res = axios.post(`${url}/profile/upload/picture/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const deleteProfilePic = async (uid, pid, token) => {
  const res = axios.delete(`${url}/profile/upload/delete/p?u=${uid}&k=${pid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const uploadProfileBanner = async (id, data, token) => {
  const res = axios.post(`${url}/profile/upload/cover/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const deleteProfileBanner = async (uid, pid, token) => {
  const res = axios.delete(`${url}/profile/upload/delete/b?u=${uid}&k=${pid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const followUser = async (owner_id, follow_id, token) => {
  const res = axios.patch(
    `${url}/follow/${owner_id}`,
    { follow_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
};

export const unfollowUser = async (owner_id, follow_id, token) => {
  const res = axios.patch(
    `${url}/unfollow/${owner_id}`,
    { follow_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
};
