import axios from "axios";
import { devApiUrl } from "../config.json";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/comments"
    : `${devApiUrl}/comments`;

export const getComments = async (id, skip, token) => {
  const res = axios.get(`${url}/${id}?p=${skip}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const createComment = async (post, token) => {
  const res = axios.post(`${url}/create`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const updateComment = async (id, content, token) => {
  const res = axios.patch(
    `${url}/update/${id}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
};

export const deleteComment = async (id, token) => {
  const res = axios.delete(`${url}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export default {
  getComments,
  createComment,
  deleteComment,
};
