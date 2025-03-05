import React from "react";
import "../styles/Sidebar.scss";

const categories = [
  "PC Gaming",
  "PC Đồ họa - Làm việc",
  "PC Trí tuệ nhân tạo",
  "PC Văn phòng",
  "Linh kiện",
  "Màn hình",
  "Thiết bị văn phòng",
  "Ghế & Gear",
  "Thiết bị mạng",
];

const Sidebar = () => (
  <div className="sidebar">
    <ul>
      {categories.map((category, index) => (
        <li key={index}>
          {category}
          <span>&gt;</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;

