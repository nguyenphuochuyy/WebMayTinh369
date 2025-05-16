// import React, { useState, useRef, useEffect } from "react";
// import { Button, Input, List, Spin, Empty } from "antd";

// const { TextArea } = Input;

// const ChatBox = ({ onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const getAIResponse = async (message) => {
//     try {
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // Sử dụng Vite env
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [
//             { role: "system", content: "Bạn là một trợ lý AI chuyên tư vấn mua sắm. Hãy trả lời tự nhiên và hữu ích." },
//             { role: "user", content: message },
//           ],
//           max_tokens: 150,
//           temperature: 0.7,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status} - ${await response.text()}`);
//       }

//       const data = await response.json();
//       return data.choices[0].message.content;
//     } catch (error) {
//       console.error("Error calling OpenAI API:", error);
//       return `Xin lỗi, mình gặp lỗi khi trả lời. Mã lỗi: ${error.message}. Bạn có thể thử lại không?`;
//     }
//   };


//   const handleSendMessage = async () => {
//     if (inputMessage.trim()) {
//       setMessages((prev) => [...prev, { text: inputMessage, sender: "user" }]);
//       setIsLoading(true);

//       const aiResponse = await getAIResponse(inputMessage);
//       setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
//       setIsLoading(false);

//       setInputMessage("");
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: "80px",
//         right: "20px",
//         width: "300px",
//         height: "400px",
//         background: "#fff",
//         border: "1px solid #d9d9d9",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <div
//         style={{
//           padding: "10px",
//           borderBottom: "1px solid #d9d9d9",
//           fontWeight: "bold",
//           alignItems: "center",
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         CHAT VỚI TƯ VẤN VIÊN
//         <Button
//           type="link"
//           onClick={onClose}
//           style={{ float: "right", padding: 0 }}
//         >
//           Đóng
//         </Button>
//       </div>
//       <div
//         style={{
//           flex: 1,
//           overflowY: "auto",
//           padding: "10px",
//         }}
//       >
//         {messages.length === 0 ? (
//           <Empty description="Nhập tin nhắn để bắt đầu cuộc trò chuyện!" />
//         ) : (
//           <List
//             dataSource={messages}
//             renderItem={(item) => (
//               <List.Item
//                 style={{
//                   textAlign: item.sender === "user" ? "right" : "left",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div
//                   style={{
//                     background: item.sender === "user" ? "#1890ff" : "#f0f0f0",
//                     color: item.sender === "user" ? "#fff" : "#000",
//                     padding: "8px",
//                     borderRadius: "4px",
//                     display: "inline-block",
//                     maxWidth: "70%",
//                   }}
//                 >
//                   {item.text}
//                 </div>
//               </List.Item>
//             )}
//           />
//         )}
//         {isLoading && <Spin style={{ display: "block", margin: "10px auto" }} />}
//         <div ref={messagesEndRef} />
//       </div>
//       <div style={{ padding: "10px", borderTop: "1px solid #d9d9d9" }}>
//         <TextArea
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           onPressEnter={handleSendMessage}
//           placeholder="Nhập tin nhắn..."
//           autoSize={{ minRows: 1, maxRows: 3 }}
//         />
//         <Button
//           type="primary"
//           onClick={handleSendMessage}
//           style={{ marginTop: "8px", width: "100%" }}
//           disabled={isLoading}
//         >
//           Gửi
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;



// import React, { useState, useRef, useEffect } from "react";
// import { Button, Input, List, Spin, Empty } from "antd";

// const { TextArea } = Input;

// const ChatBox = ({ onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const getAIResponse = async (message) => {
//     try {
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [
//             { role: "system", content: "Bạn là một trợ lý AI chuyên tư vấn mua sắm. Hãy trả lời tự nhiên và hữu ích." },
//             { role: "user", content: message },
//           ],
//           max_tokens: 150,
//           temperature: 0.7,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status} - ${await response.text()}`);
//       }

//       const data = await response.json();
//       return data.choices[0].message.content;
//     } catch (error) {
//       console.error("Error calling OpenAI API:", error);
//       return `Xin lỗi, mình gặp lỗi khi trả lời. Mã lỗi: ${error.message}. Vui lòng thử lại sau!`;
//     }
//   };

//   const handleSendMessage = async () => {
//     if (inputMessage.trim()) {
//       setMessages((prev) => [...prev, { text: inputMessage, sender: "user" }]);
//       setIsLoading(true);

//       const aiResponse = await getAIResponse(inputMessage);
//       setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
//       setIsLoading(false);

//       setInputMessage("");
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: "80px",
//         right: "20px",
//         width: "300px",
//         height: "400px",
//         background: "#fff",
//         border: "1px solid #d9d9d9",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <div
//         style={{
//           padding: "10px",
//           borderBottom: "1px solid #d9d9d9",
//           fontWeight: "bold",
//           alignItems: "center",
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         CHAT VỚI TƯ VẤN VIÊN
//         <Button
//           type="link"
//           onClick={onClose}
//           style={{ padding: 0 }}
//         >
//           Đóng
//         </Button>
//       </div>
//       <div
//         style={{
//           flex: 1,
//           overflowY: "auto",
//           padding: "10px",
//           minHeight: 0, // Đảm bảo flex hoạt động đúng
//         }}
//       >
//         {messages.length === 0 ? (
//           <Empty description="Nhập tin nhắn để bắt đầu cuộc trò chuyện!" />
//         ) : (
//           <List
//             dataSource={messages}
//             renderItem={(item) => (
//               <List.Item
//                 style={{
//                   textAlign: item.sender === "user" ? "right" : "left",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div
//                   style={{
//                     background: item.sender === "user" ? "#1890ff" : "#f0f0f0",
//                     color: item.sender === "user" ? "#fff" : "#000",
//                     padding: "8px",
//                     borderRadius: "4px",
//                     display: "inline-block",
//                     maxWidth: "70%",
//                     wordBreak: "break-word", // Ngăn text tràn
//                   }}
//                 >
//                   {item.text}
//                 </div>
//               </List.Item>
//             )}
//           />
//         )}
//         {isLoading && <Spin style={{ display: "block", margin: "10px auto" }} />}
//         <div ref={messagesEndRef} />
//       </div>
//       <div style={{ padding: "10px", borderTop: "1px solid #d9d9d9" }}>
//         <TextArea
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           onPressEnter={handleSendMessage}
//           placeholder="Nhập tin nhắn..."
//           autoSize={{ minRows: 1, maxRows: 3 }}
//         />
//         <Button
//           type="primary"
//           onClick={handleSendMessage}
//           style={{ marginTop: "8px", width: "100%" }}
//           disabled={isLoading}
//         >
//           Gửi
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;


//CODE TỐI NAY
// import React, { useState, useRef, useEffect } from "react";
// import { Button, Input, List, Spin, Empty } from "antd";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const { TextArea } = Input;

// const ChatBox = ({ onClose }) => {
//   const [messages, setMessages] = useState(() => {
//     const savedMessages = localStorage.getItem("chatMessages");
//     return savedMessages ? JSON.parse(savedMessages) : [];
//   });
//   const [inputMessage, setInputMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     localStorage.setItem("chatMessages", JSON.stringify(messages));
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const getAIResponse = async (message) => {
//     try {
//       const prompt = `Bạn là một trợ lý AI chuyên tư vấn mua sắm. Hãy trả lời tự nhiên và hữu ích bằng tiếng Việt. Câu hỏi của người dùng: ${message}`;
//       const result = await model.generateContent(prompt);
//       return result.response.text();
//     } catch (error) {
//       console.error("Error calling Gemini API:", error);
//       return "Xin lỗi, mình gặp lỗi khi trả lời. Vui lòng thử lại sau!";
//     }
//   };

//   const handleSendMessage = async () => {
//     if (inputMessage.trim()) {
//       const newUserMessage = { text: inputMessage, sender: "user" };
//       setMessages((prev) => [...prev, newUserMessage]);
//       setIsLoading(true);

//       const aiResponse = await getAIResponse(inputMessage);
//       setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
//       setIsLoading(false);

//       setInputMessage("");
//     }
//   };

//   const handleClearHistory = () => {
//     setMessages([]);
//     localStorage.removeItem("chatMessages");
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: "80px",
//         right: "20px",
//         width: "300px",
//         height: "400px",
//         background: "#fff",
//         border: "1px solid #d9d9d9",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//         display: "flex",
//         flexDirection: "column",
//         zIndex: 10000,
//       }}
//     >
//       <div
//         style={{
//           padding: "10px",
//           borderBottom: "1px solid #d9d9d9",
//           fontWeight: "bold",
//           alignItems: "center",
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         Chat Với Tư Vấn Viên
//         <div>
//           <Button
//             type="link"
//             onClick={handleClearHistory}
//             style={{ padding: 0, marginRight: "10px" }}
//           >
//             Xóa lịch sử
//           </Button>
//           <Button
//             type="link"
//             onClick={onClose}
//             style={{ padding: 0 }}
//           >
//             Đóng
//           </Button>
//         </div>
//       </div>
//       <div
//         style={{
//           flex: 1,
//           overflowY: "auto",
//           padding: "10px",
//           minHeight: 0,
//         }}
//       >
//         {messages.length === 0 ? (
//           <Empty description="Nhập tin nhắn để bắt đầu cuộc trò chuyện!" />
//         ) : (
//           <List
//             dataSource={messages}
//             renderItem={(item) => (
//               <List.Item
//                 style={{
//                   textAlign: item.sender === "user" ? "right" : "left",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div
//                   style={{
//                     background: item.sender === "user" ? "#1890ff" : "#f0f0f0",
//                     color: item.sender === "user" ? "#fff" : "#000",
//                     padding: "8px",
//                     borderRadius: "4px",
//                     display: "inline-block",
//                     maxWidth: "70%",
//                     wordBreak: "break-word",
//                   }}
//                 >
//                   {item.text}
//                 </div>
//               </List.Item>
//             )}
//           />
//         )}
//         {isLoading && <Spin style={{ display: "block", margin: "10px auto" }} />}
//         <div ref={messagesEndRef} />
//       </div>
//       <div style={{ padding: "10px", borderTop: "1px solid #d9d9d9" }}>
//         <TextArea
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           onPressEnter={handleSendMessage}
//           placeholder="Nhập tin nhắn..."
//           autoSize={{ minRows: 1, maxRows: 3 }}
//         />
//         <Button
//           type="primary"
//           onClick={handleSendMessage}
//           style={{ marginTop: "8px", width: "100%" }}
//           disabled={isLoading}
//         >
//           Gửi
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

// import React, { useState, useRef, useEffect } from "react";
// import { Button, Input, List, Spin, Empty, Modal } from "antd";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import Picker from "emoji-picker-react";

// const { TextArea } = Input;

// const ChatBox = ({ onClose }) => {
//   const [messages, setMessages] = useState(() => {
//     const savedMessages = localStorage.getItem("chatMessages");
//     return savedMessages ? JSON.parse(savedMessages) : [];
//   });
//   const [displayedMessages, setDisplayedMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [backgroundColor, setBackgroundColor] = useState(() => {
//     return localStorage.getItem("chatBackgroundColor") || "#fff";
//   });
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [page, setPage] = useState(1);
//   const messagesPerPage = 20;
//   const messagesEndRef = useRef(null);
//   const messagesStartRef = useRef(null);

//   useEffect(() => {
//     localStorage.setItem("chatMessages", JSON.stringify(messages));
//     const startIndex = Math.max(messages.length - page * messagesPerPage, 0);
//     setDisplayedMessages(messages.slice(startIndex));
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, page]);

//   useEffect(() => {
//     localStorage.setItem("chatBackgroundColor", backgroundColor);
//   }, [backgroundColor]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && messages.length > displayedMessages.length) {
//           setPage((prev) => prev + 1);
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (messagesStartRef.current) {
//       observer.observe(messagesStartRef.current);
//     }

//     return () => {
//       if (messagesStartRef.current) {
//         observer.unobserve(messagesStartRef.current);
//       }
//     };
//   }, [displayedMessages, messages]);

//   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const getAIResponse = async (message) => {
//     try {
//       const prompt = `Bạn là một trợ lý AI chuyên tư vấn mua sắm. Hãy trả lời tự nhiên và hữu ích bằng tiếng Việt. Câu hỏi của người dùng: ${message}`;
//       const result = await model.generateContent(prompt);
//       return result.response.text();
//     } catch (error) {
//       console.error("Error calling Gemini API:", error);
//       return "Xin lỗi, mình gặp lỗi khi trả lời. Vui lòng thử lại sau!";
//     }
//   };

//   const handleSendMessage = async () => {
//     if (inputMessage.trim()) {
//       const timestamp = new Date().toLocaleTimeString("vi-VN", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       const newUserMessage = { text: inputMessage, sender: "user", timestamp };
//       setMessages((prev) => [...prev, newUserMessage]);
//       setIsLoading(true);

//       const aiResponse = await getAIResponse(inputMessage);
//       const aiTimestamp = new Date().toLocaleTimeString("vi-VN", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       setMessages((prev) => [...prev, { text: aiResponse, sender: "ai", timestamp: aiTimestamp }]);
//       setIsLoading(false);

//       setInputMessage("");
//       setShowEmojiPicker(false);
//     }
//   };

//   const handleClearHistory = () => {
//     setIsModalVisible(true);
//   };

//   const handleConfirmClear = () => {
//     setMessages([]);
//     setDisplayedMessages([]);
//     setPage(1);
//     localStorage.removeItem("chatMessages");
//     setIsModalVisible(false);
//   };

//   const handleCancelClear = () => {
//     setIsModalVisible(false);
//   };

//   const handleChangeBackgroundColor = (e) => {
//     setBackgroundColor(e.target.value);
//   };

//   const getLuminance = (hexColor) => {
//     const r = parseInt(hexColor.slice(1, 3), 16);
//     const g = parseInt(hexColor.slice(3, 5), 16);
//     const b = parseInt(hexColor.slice(5, 7), 16);
//     return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
//   };

//   const isDarkBackground = getLuminance(backgroundColor) < 0.5;

//   const onEmojiClick = (emojiObject) => {
//     setInputMessage((prev) => prev + emojiObject.emoji);
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: "80px",
//         right: "20px",
//         width: "350px", // Tăng chiều rộng để có thêm không gian
//         height: "400px",
//         background: "#fff",
//         border: "1px solid #d9d9d9",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//         display: "flex",
//         flexDirection: "column",
//         zIndex: 10000,
//       }}
//     >
//       <div
//         style={{
//           padding: "10px",
//           borderBottom: "1px solid #d9d9d9",
//           fontWeight: "bold",
//           alignItems: "center",
//           display: "flex",
//           justifyContent: "space-between",
//           background: "#fff",
//         }}
//       >
//         CHAT VỚI TƯ VẤN VIÊN
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <input
//             type="color"
//             value={backgroundColor}
//             onChange={handleChangeBackgroundColor}
//             style={{ marginRight: "10px", width: "24px", height: "24px", padding: 0, border: "none", cursor: "pointer" }}
//           />
//           <Button
//             type="link"
//             onClick={handleClearHistory}
//             style={{ padding: 0, marginRight: "10px" }}
//           >
//             Xóa lịch sử
//           </Button>
//           <Button
//             type="link"
//             onClick={onClose}
//             style={{ padding: 0 }}
//           >
//             Đóng
//           </Button>
//         </div>
//       </div>
//       <div
//         style={{
//           flex: 1,
//           overflowY: "auto",
//           padding: "10px",
//           minHeight: 0,
//           background: backgroundColor,
//         }}
//       >
//         <div ref={messagesStartRef} />
//         {displayedMessages.length === 0 ? (
//           <Empty description="Nhập tin nhắn để bắt đầu cuộc trò chuyện!" />
//         ) : (
//           <List
//             dataSource={displayedMessages}
//             renderItem={(item) => (
//               <List.Item
//                 style={{
//                   textAlign: item.sender === "user" ? "right" : "left",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: item.sender === "user" ? "flex-end" : "flex-start",
//                     alignItems: "flex-end",
//                   }}
//                 >
//                   <div
//                     style={{
//                       background: item.sender === "user" ? "#1890ff" : isDarkBackground ? "#555" : "#f0f0f0",
//                       color: item.sender === "user" ? "#fff" : isDarkBackground ? "#fff" : "#000",
//                       padding: "8px",
//                       borderRadius: "4px",
//                       display: "inline-block",
//                       maxWidth: "90%", // Tăng maxWidth để giảm ngắt dòng
//                       wordBreak: "break-word", // Chỉ ngắt từ khi cần thiết
//                       marginRight: item.sender === "user" ? "5px" : 0,
//                       marginLeft: item.sender === "user" ? 0 : "5px",
//                     }}
//                   >
//                     {item.text}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "10px",
//                       color: isDarkBackground ? "#ccc" : "#888",
//                       whiteSpace: "nowrap", // Đảm bảo thời gian không bị ngắt dòng
//                     }}
//                   >
//                     {item.timestamp}
//                   </div>
//                 </div>
//               </List.Item>
//             )}
//           />
//         )}
//         {isLoading && <Spin style={{ display: "block", margin: "10px auto" }} />}
//         <div ref={messagesEndRef} />
//       </div>
//       <div
//         style={{
//           padding: "10px",
//           borderTop: "1px solid #d9d9d9",
//           background: "#fff",
//           position: "relative",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             right: "10px",
//             top: "10px",
//             zIndex: 10001,
//           }}
//         >
//           <Button
//             type="link"
//             onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//             style={{ padding: 0 }}
//           >
//             😊
//           </Button>
//           {showEmojiPicker && (
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: "40px",
//                 right: "0",
//                 zIndex: 10002,
//               }}
//             >
//               <Picker onEmojiClick={onEmojiClick} />
//             </div>
//           )}
//         </div>
//         <TextArea
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           onPressEnter={handleSendMessage}
//           placeholder="Nhập tin nhắn..."
//           autoSize={{ minRows: 1, maxRows: 3 }}
//         />
//         <Button
//           type="primary"
//           onClick={handleSendMessage}
//           style={{ marginTop: "8px", width: "100%" }}
//           disabled={isLoading}
//         >
//           Gửi
//         </Button>
//       </div>
//       <Modal
//         title="Xác nhận xóa lịch sử"
//         visible={isModalVisible}
//         onOk={handleConfirmClear}
//         onCancel={handleCancelClear}
//         okText="Xóa"
//         cancelText="Hủy"
//       >
//         <p>Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện không?</p>
//       </Modal>
//     </div>
//   );
// };

// export default ChatBox;


import React, { useState, useRef, useEffect } from "react";
import { Button, Input, List, Spin, Empty, Modal } from "antd";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Picker from "emoji-picker-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { TextArea } = Input;

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(() => {
    return localStorage.getItem("chatBackgroundColor") || "#fff";
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [page, setPage] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const messagesPerPage = 20;
  const messagesEndRef = useRef(null);
  const messagesStartRef = useRef(null);

  // Tọa độ của Trường Đại học Công nghiệp TP.HCM (IUH)
  const shopPosition = [10.821589, 106.688454]; // 12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    const startIndex = Math.max(messages.length - page * messagesPerPage, 0);
    setDisplayedMessages(messages.slice(startIndex));
    if (messagesEndRef.current && showChat) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, page, showChat]);

  useEffect(() => {
    localStorage.setItem("chatBackgroundColor", backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && messages.length > displayedMessages.length && showChat) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (messagesStartRef.current) {
      observer.observe(messagesStartRef.current);
    }

    return () => {
      if (messagesStartRef.current) {
        observer.unobserve(messagesStartRef.current);
      }
    };
  }, [displayedMessages, messages, showChat]);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const getAIResponse = async (message) => {
    try {
      const prompt = `Bạn là một trợ lý AI chuyên tư vấn mua sắm. Hãy trả lời tự nhiên và hữu ích bằng tiếng Việt. Câu hỏi của người dùng: ${message}`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "Xin lỗi, mình gặp lỗi khi trả lời. Vui lòng thử lại sau!";
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const timestamp = new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newUserMessage = { text: inputMessage, sender: "user", timestamp };
      setMessages((prev) => [...prev, newUserMessage]);
      setIsLoading(true);

      const aiResponse = await getAIResponse(inputMessage);
      const aiTimestamp = new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai", timestamp: aiTimestamp }]);
      setIsLoading(false);

      setInputMessage("");
      setShowEmojiPicker(false);
    }
  };

  const handleClearHistory = () => {
    setIsModalVisible(true);
  };

  const handleConfirmClear = () => {
    setMessages([]);
    setDisplayedMessages([]);
    setPage(1);
    localStorage.removeItem("chatMessages");
    setIsModalVisible(false);
  };

  const handleCancelClear = () => {
    setIsModalVisible(false);
  };

  const handleChangeBackgroundColor = (e) => {
    setBackgroundColor(e.target.value);
  };

  const getLuminance = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const isDarkBackground = getLuminance(backgroundColor) < 0.5;

  const onEmojiClick = (emojiObject) => {
    setInputMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: "350px",
        height: showChat ? "400px" : "200px",
        background: "#fff",
        border: "1px solid #d9d9d9",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        zIndex: 10000,
      }}
    >
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #d9d9d9",
          fontWeight: "bold",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          background: "#fff",
        }}
      >
        CHAT VỚI TƯ VẤN VIÊN
        <div style={{ display: "flex", alignItems: "center" }}>
          {showChat && (
            <>
              <input
                type="color"
                value={backgroundColor}
                onChange={handleChangeBackgroundColor}
                style={{ marginRight: "10px", width: "24px", height: "24px", padding: 0, border: "none", cursor: "pointer" }}
              />
              <Button
                type="link"
                onClick={handleClearHistory}
                style={{ padding: 0, marginRight: "10px" }}
              >
                Xóa lịch sử
              </Button>
            </>
          )}
          <Button
            type="link"
            onClick={onClose}
            style={{ padding: 0 }}
          >
            Đóng
          </Button>
        </div>
      </div>
      {!showChat && !showMap && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            gap: "10px",
          }}
        >
          <Button
            type="default"
            onClick={() => setShowMap(true)}
            style={{
              width: "100%",
              borderRadius: "20px",
              border: "1px solid #d9d9d9",
              background: "#fff",
              color: "#000",
              fontWeight: "bold",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            Shop bạn ở đâu
          </Button>
          <Button
            type="default"
            onClick={() => setShowChat(true)}
            style={{
              width: "100%",
              borderRadius: "20px",
              border: "1px solid #d9d9d9",
              background: "#fff",
              color: "#000",
              fontWeight: "bold",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            Chat với tư vấn viên
          </Button>
        </div>
      )}
      {showMap && (
        <div style={{ height: "100%", width: "100%", position: "relative" }}>
          <MapContainer
            center={shopPosition}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={shopPosition}>
              <Popup>
                Trường Đại học Công nghiệp TP.HCM <br />
                12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh <br />
                <a href="https://maps.app.goo.gl/aU6P1fecSQKGo2w27" target="_blank" rel="noopener noreferrer">
                  Xem trên Google Maps
                </a>
              </Popup>
            </Marker>
          </MapContainer>
          <Button
            type="default"
            onClick={() => setShowMap(false)}
            style={{
              position: "absolute",
              bottom: "10px", // Di chuyển xuống dưới
              right: "10px",
              background: "#fff", // Thêm nền trắng
              border: "1px solid #d9d9d9", // Thêm viền
              borderRadius: "4px", // Bo góc
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // Thêm bóng
              zIndex: 1000, // Đảm bảo nút nằm trên bản đồ
            }}
          >
            Đóng
          </Button>
        </div>
      )}
      {showChat && (
        <>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px",
              minHeight: 0,
              background: backgroundColor,
            }}
          >
            <div ref={messagesStartRef} />
            {displayedMessages.length === 0 ? (
              <Empty description="Nhập tin nhắn để bắt đầu cuộc trò chuyện!" />
            ) : (
              <List
                dataSource={displayedMessages}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      textAlign: item.sender === "user" ? "right" : "left",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: item.sender === "user" ? "flex-end" : "flex-start",
                        alignItems: "flex-end",
                      }}
                    >
                      <div
                        style={{
                          background: item.sender === "user" ? "#1890ff" : isDarkBackground ? "#555" : "#f0f0f0",
                          color: item.sender === "user" ? "#fff" : isDarkBackground ? "#fff" : "#000",
                          padding: "8px",
                          borderRadius: "4px",
                          display: "inline-block",
                          maxWidth: "90%",
                          wordBreak: "break-word",
                          marginRight: item.sender === "user" ? "5px" : 0,
                          marginLeft: item.sender === "user" ? 0 : "5px",
                        }}
                      >
                        {item.text}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: isDarkBackground ? "#ccc" : "#888",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.timestamp}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            )}
            {isLoading && <Spin style={{ display: "block", margin: "10px auto" }} />}
            <div ref={messagesEndRef} />
          </div>
          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #d9d9d9",
              background: "#fff",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                zIndex: 10001,
              }}
            >
              <Button
                type="link"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                style={{ padding: 0 }}
              >
                😊
              </Button>
              {showEmojiPicker && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "40px",
                    right: "0",
                    zIndex: 10002,
                  }}
                >
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
            <TextArea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onPressEnter={handleSendMessage}
              placeholder="Nhập tin nhắn..."
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
            <Button
              type="primary"
              onClick={handleSendMessage}
              style={{ marginTop: "8px", width: "100%" }}
              disabled={isLoading}
            >
              Gửi
            </Button>
          </div>
        </>
      )}
      <Modal
        title="Xác nhận xóa lịch sử"
        visible={isModalVisible}
        onOk={handleConfirmClear}
        onCancel={handleCancelClear}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện không?</p>
      </Modal>
    </div>
  );
};

export default ChatBox;