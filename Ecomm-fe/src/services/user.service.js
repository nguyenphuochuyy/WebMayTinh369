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
export { 
 getListUser 
};
