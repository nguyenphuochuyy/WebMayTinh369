import axios from "./axios.customize";
const getListUser = async () => {
    try {
        // Giả lập gọi API để lấy danh sách người dùng
        const response = await fetch("http://localhost:8080/users/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if(!response.ok) {
          throw new Error("Lỗi khi lấy danh sách người dùng");
        }
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
} 

const updateUser = async (userData) => {
    const URL_BACKEND = `http://localhost:8080/users/update/${userData.id}`;
    const data = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        // avatar: userData.avatar,
    };
    return axios.post(URL_BACKEND, data);
}
const addUser = async (userData) => {
     try {
        const response = await fetch(`http://localhost:8080/users/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(userData),
        });
        if(!response.ok) {
          throw new Error("Lỗi khi cập nhật người dùng" , response.status);
        }
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
      }
}

const getUserById = async (id) => {
  const response = await axios.get(`http://localhost:8080/users/getUserById/${id}`);
  return response;
}
export {
 getListUser,
 updateUser,
 addUser,
 getUserById
};
