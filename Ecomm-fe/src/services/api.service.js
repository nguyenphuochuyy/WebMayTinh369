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

const createPaymentAPI = async ( id , amount, status) => {
  try {
    const response = await axios.post(
      "http://localhost:8088/api/create-payment",
      {
        id: id,
        amount: amount,
        status: status,
      }
    );

    // Xử lý thành công
    console.log("Tạo thanh toán thành công:", response);
    return response;
  } catch (error) {
    // Xử lý lỗi
    console.error("Lỗi khi tạo thanh toán:", error);
    return null;
  }
}

const getAddressAPI = async (address) => {
  const URL_BACKEND = "http://localhost:8080/users/getAddressByUser";
  return axios.get(URL_BACKEND);
}

const deleteAddressAPI = async (addressId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/users/deleteAddress/${addressId}`
    );

    // Xử lý thành công
    console.log("Xóa địa chỉ thành công:", response);
    return response;
  } catch (error) {
    // Xử lý lỗi
    console.error("Lỗi khi xóa địa chỉ:", error);
    return null;
  }
}

const addAddressAPI = async (street, city) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/users/addAddress",
      {
        street: street,
        city: city,
      }
    );

    // Xử lý thành công
    console.log("Thêm địa chỉ thành công:", response);
    return response;
  } catch (error) {
    // Xử lý lỗi
    console.error("Lỗi khi thêm địa chỉ:", error);
    return null;
  }
}

const updateAddressAPI = async (addressId, street, city) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/users/updateAddress/${addressId}`,
      {
        street: street,
        city: city,
      }
    );

    // Xử lý thành công
    console.log("Cập nhật địa chỉ thành công:", response);
    return response;
  } catch (error) {
    // Xử lý lỗi
    console.error("Lỗi khi cập nhật địa chỉ:", error);
    return null;
  }
}

const placeOrderAPI = async (products, paymentMethodId, shippingAddress, note) => {
  try {
    const response = await axios.post(
      "http://localhost:8085/api/v1/order/placeOrder",
      {
        products: products, 
        paymentMethodId: paymentMethodId,
        shippingAddress: shippingAddress,
        note: note,
      }
    );

    console.log("Đặt hàng thành công:", response);
    return response;
  } catch (error) {
    console.error("Lỗi khi đặt hàng:", error);
    return null;
  }
}

const checkProductQuantityAPI = async (products) => {
  try {
    const response = await axios.post(
      "http://localhost:8085/api/v1/order/checkProductQuantity",
      {
        products: products,
      }
    );

    console.log("Kiểm tra số lượng sản phẩm thành công:", response);
    return response;
  } catch (error) {
    console.error("Lỗi khi kiểm tra số lượng sản phẩm:", error);
    return null;
  }
}

const getOrderAPI = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8085/api/v1/order/getOrders"
    );

    console.log("Lấy danh sách đơn hàng thành công:", response);
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    return null;
  }
}


const getAllOrdersAPI = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8085/api/v1/order/getOrderAllOrder"
    );

    console.log("Lấy danh sách đơn hàng thành công:", response);
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    return null;
  }
}

const updateOrderStatusAPI = async (orderId, status, message) => {
  try {
    const response = await axios.post(
      `http://localhost:8085/api/v1/order/updateStatus/${orderId}`,
      {
        status: status,
        message: message,
      }
    );

    console.log("Cập nhật trạng thái đơn hàng thành công:", response);
    return response;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    return null;
  }
}


export {
  signupAPI,
  loginAPI,
  getAccountAPI,
  logoutAPI,
  addProductToCart,
  getCartAPI,
  removeProductFromCart,
  createPaymentAPI,
  getAddressAPI,
  deleteAddressAPI,
  addAddressAPI,
  updateAddressAPI,
  placeOrderAPI,
  getOrderAPI,
  getAllOrdersAPI,
  updateOrderStatusAPI,
  checkProductQuantityAPI
};
