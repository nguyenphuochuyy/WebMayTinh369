import axios from "./axios.customize";

const signupAPI = (username, email, password) => {
  const URL_BACKEND = "http://localhost:8080/auth/signup";
  const data = {
    username,
    email,
    password,
  };
  return axios.post(URL_BACKEND, data);
};

const loginAPI = (username, password) => {
  const URL_BACKEND = "http://localhost:8080/auth/login";
  const data = {
    username,
    password,
  };
  return axios.post(URL_BACKEND, data);
};

const logoutAPI = () => {
  const URL_BACKEND = "http://localhost:8080/auth/logout";
  return axios.post(URL_BACKEND);
};

const getAccountAPI = () => {
  const URL_BACKEND = "http://localhost:8080/users/account";
  return axios.get(URL_BACKEND);
};

const addProductToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(
      "http://localhost:8085/api/v1/cart/addProductToCart",
      {
        productId: productId,
        quantity: quantity,
      }
    );

    // Xử lý thành công
    console.log("Thêm sản phẩm vào giỏ hàng thành công:", response);
    return response;
  } catch (error) {
    // Xử lý lỗi
    console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    return null;
  }
};

const removeProductFromCart = async (cartDetailId) => {
  try {
    // Sử dụng template string để thay thế :productId trong URL
    const response = await axios.post(
      `http://localhost:8085/api/v1/cart/removeProductFromCart/${cartDetailId}`
    );

    // Xử lý thành công
    console.log("Xóa sản phẩm khỏi giỏ hàng thành công:", response);
    return response;
  } catch (error) {
    // Xử lý lỗi
    console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    return null;
  }
};

const getCartAPI = () => {
  const URL_BACKEND = "http://localhost:8085/api/v1/cart/getCart";
  return axios.get(URL_BACKEND);
};

export {
  signupAPI,
  loginAPI,
  getAccountAPI,
  logoutAPI,
  addProductToCart,
  getCartAPI,
  removeProductFromCart,
};
