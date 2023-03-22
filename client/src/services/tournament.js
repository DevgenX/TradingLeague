import axios from "axios";
import { devApiUrl } from "../config.json";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/tournament"
    : `${devApiUrl}/tournament`;

export const getUsers = async (id, token) => {
  const res = axios.get(`${url}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getUserTournaments = async (id, token) => {
  const res = axios.get(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const createTournament = async (tournament, token) => {
  const res = axios.post(`${url}/create`, tournament, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getBrackets = async (id, token) => {
  const res = axios.get(`${url}/brackets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const setMatch = async (id, tournament, p, token) => {
  const res = axios.put(`${url}/game_match/p${p}/${id}`, tournament, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const checkMatch = async (id, token) => {
  const res = axios.put(
    `${url}/game_check/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
};

export const checkTournament = async (id, token) => {
  const res = axios.delete(`${url}/check_status/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
