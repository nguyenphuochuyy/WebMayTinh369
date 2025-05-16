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

export {
  getCategories,
  getProductById,
  getAllProducts
}