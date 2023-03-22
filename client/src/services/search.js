import axios from "axios";
import { devApiUrl } from "../config.json";

const url =
  process.env.NODE_ENV === "production" ? "/api/users" : `${devApiUrl}/users`;

export const getSearch = async (toSearch, token) => {
  const res = axios.get(`${url}/search?s=${toSearch}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
