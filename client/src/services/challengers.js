import axios from "axios";
import { devApiUrl } from "../config.json";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/challengers"
    : `${devApiUrl}/challengers`;

export const getChallenges = async (id, token) => {
  const res = axios.get(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const findMatch = async (id, token) => {
  const res = axios.get(`${url}/find_match/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const findChallenger = async (user, username, token) => {
  const res = axios.get(
    `${url}/find_challenger?username=${username}&owner=${user}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
};

export const saveChallenge = async (data, token) => {
  const res = axios.post(`${url}/new_challenge`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const declineChallenge = async (id, token) => {
  const res = axios.delete(`${url}/decline/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const removeChallenge = async (id, token) => {
  const res = axios.delete(`${url}/remove/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
