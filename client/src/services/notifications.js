import axios from "axios";
import { devApiUrl } from "../config.json";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/notifications"
    : `${devApiUrl}/notifications`;

export const getUserNotif = async (id, token) => {
  const res = axios.get(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const createUserNotif = async (notif, token) => {
  const res = axios.post(`${url}/`, notif, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const deleteUserNotif = async (id, token) => {
  const res = axios.delete(`${url}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const deleteAllNotif = async (id, token) => {
  const res = axios.delete(`${url}/delete/all/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export default {
  createUserNotif,
  deleteUserNotif,
  deleteAllNotif,
  getUserNotif,
};
