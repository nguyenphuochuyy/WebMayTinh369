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
    try {
        const response = await fetch(`http://localhost:8080/users/update`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(userData),
        });
        if(!response.ok) {
          throw new Error("Lỗi khi cập nhật người dùng");
        }
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
      }
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
export {
 getListUser,
 updateUser,
 addUser
};
