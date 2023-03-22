import axios from "axios";
import { devApiUrl } from "../config.json";

const url =
  process.env.NODE_ENV === "production" ? "/api/posts" : `${devApiUrl}/posts`;

export const getFeed = async (skip) => {
  const res = axios.get(`${url}?p=${skip}`);

  return res;
};

export const getUserPosts = async (skip, id, token) => {
  const res = axios.get(`${url}/user/${id}?p=${skip}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getSavedPosts = async (skip, id, token) => {
  const res = axios.get(`${url}/saved/${id}?p=${skip}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const createPost = async (post, token) => {
  const res = axios.post(`${url}/create`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const updatePost = async (id, data, token) => {
  const res = axios.patch(`${url}/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const likePost = async (user_id, post_id, token) => {
  const res = axios.patch(
    `${url}/like`,
    { user_id, post_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
};

export const savePost = async (user_id, post_id, token) => {
  const res = axios.patch(
    `${url}/save`,
    { user_id, post_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
};

// export const updatePostPic = async (user_id, token) => {
//   console.log(user_id);
//   const res = axios.patch(
//     `${url}/update-profile-pic`,
//     { user_id },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return res;
// };

export const deletePost = async (id, token) => {
  const res = axios.delete(`${url}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export default {
  createPost,
  getFeed,
  getUserPosts,
  getSavedPosts,
  likePost,
};
