import axios from "./axios.customize";

const signupAPI = (username, email, password) => {
  const URL_BACKEND = "/auth/signup";
  const data = {
    username,
    email,
    password,
  };
  return axios.post(URL_BACKEND, data);
};

const loginAPI = (username, password) => {
  const URL_BACKEND = "/auth/login";
  const data = {
    username,
    password,
  };
  return axios.post(URL_BACKEND, data);
};

const logoutAPI = () => {
  const URL_BACKEND = "/auth/logout";
  return axios.post(URL_BACKEND);
};

const getAccountAPI = () => {
  const URL_BACKEND = "/users/account";
  return axios.get(URL_BACKEND);
};

export { signupAPI, loginAPI , getAccountAPI, logoutAPI};
