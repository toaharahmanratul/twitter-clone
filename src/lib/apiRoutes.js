import axios from "axios";

const baseURL = "http://localhost:3000";

const API = axios.create({
  baseURL,
});

export const createNewUser = (payload) => API.post("/api/register", payload);
export const getUser = (username) => API.get(`api/user/${username}`);
export const updateProfile = (username, payload) =>
  API.put(`api/user/${username}`, payload);
export const verifyEmail = (payload) =>
  API.post("api/user/verifyemail", payload);
export const getNewsFeedPosts = () => API.get(`api/newsfeed`);
export const createNewPost = (payload) => API.post("/api/post", payload); //done
export const getUserPosts = (username) => API.get(`api/post/${username}`);
export const deletePost = (postId) => API.delete(`/api/post/${postId}`);
export const updatePost = (postId, payload) =>
  API.patch(`/api/post/${postId}`, payload);
