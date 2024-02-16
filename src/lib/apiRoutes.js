import axios from "axios";

const baseURL = "http://localhost:3000";

const API = axios.create({
  baseURL,
});

export const createNewUser = (payload) => API.post("/api/register", payload);
export const getUser = (username) => API.get(`api/user/${username}`);
export const getNewsFeedPosts = () => API.get(`api/newsfeed`);
export const createNewPost = (payload) => API.post("/api/post", payload);
export const verifyEmail = (payload) =>
  API.post("api/user/verifyemail", payload);
