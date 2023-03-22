import axios from "axios";
import { devApiUrl } from "../config.json";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/leaderboard"
    : `${devApiUrl}/leaderboard`;

export const getAllTime = async () => {
  const res = await axios.get(`${url}/`);

  return res;
};

export const getFiltered = async (rank) => {
  const res = await axios.get(`${url}/filter?rank=${rank}`);

  return res;
};

export const updateLeaderboardMMR = async (id, mmr, token) => {
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
