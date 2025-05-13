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

export {
  getCategories
}