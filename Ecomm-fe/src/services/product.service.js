import axios from "./axios.customize";

const getCategories = async () => {
  try {
    const response = await fetch('http://localhost:8082/api/categories');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách danh mục sản phẩm:', error);
    throw error;
  }
}

const getProductById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8082/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin sản phẩm:', error);
    throw error;
  }
}

const getAllProducts = async () => {
  try {
    const response = await fetch('http://localhost:8082/api/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    throw error;
  }
}

const getCommentByProductId = async (id) => {
  try {
    const response = await fetch(`http://localhost:8082/api/product/${id}/comments`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bình luận:', error);
    throw error;
  }
}

const addComment = async (productId, userId, userName, rating, comment) => {
  try {
    const response = await axios.post(
      `http://localhost:8082/api/product/addComment/${productId}`, 
      {
        userId: userId,
        userName: userName,
        rating: rating,
        comment: comment
      }
     );
    // if (!response.status) {
    //   throw new Error('Network response was not ok');
    // }
    console.log('Thêm bình luận thành công:', response);
    return response;
  } catch (error) {
    console.error('Lỗi khi thêm bình luận:', error);
    throw error;
  }
}

const checkUserPurchasedProduct = async (productId) => {
  try {
    const response = await axios.get(
      `http://localhost:8085/api/v1/order/checkUserPurchaseProduct/${productId}`
    );
    console.log('Kiểm tra người dùng đã mua sản phẩm:', response);
    return response;
  } catch (error) {
    console.error('Lỗi khi kiểm tra người dùng đã mua sản phẩm:', error);
    throw error;
  }
}

const checkUserCommentedProduct = async (productId,userId) => {
  try {
    const response = await axios.get(
      `http://localhost:8082/api/product/checkUserComment/${productId}/${userId}`
    );
    console.log('Kiểm tra người dùng đã bình luận sản phẩm:', response);
    return response;
  } catch (error) {
    console.error('Lỗi khi kiểm tra người dùng đã bình luận sản phẩm:', error);
    throw error;
  }
}

export {
  getCategories,
  getProductById,
  getAllProducts,
  getCommentByProductId,
  addComment,
  checkUserPurchasedProduct,
  checkUserCommentedProduct
}