import axios from "axios";
import { devApiUrl } from "../config.json";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/game_history"
    : `${devApiUrl}/game_history`;

export const getHistory = async (id, token) => {
  const res = axios.get(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const saveHistory = async (data, token) => {
  const res = axios.post(`${url}/new`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const updateDeclinedHistory = async (data, token) => {
  const res = axios.patch(`${url}/update/declined`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const updateAcceptedHistory = async (data, token) => {
  const res = axios.patch(`${url}/update/accepted`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
