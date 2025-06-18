// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import xx from '../assets/xx.jpg';



// // // const RegisterLogin = () => {
// // //   const [isRegistering, setIsRegistering] = useState(true);
// // //   const [formData, setFormData] = useState({
// // //     username: "",
// // //     email: "",
// // //     password: "",
// // //     fullName: "",
// // //     gender: true,
// // //     dateOfBirth: "",
// // //     address: "",
// // //     phone: "",
// // //     avatar: "1",
// // //     roleName: "",
// // //   });

// // //   const [errors, setErrors] = useState({
// // //     email: "",
// // //     phone: "",
// // //   });

// // //   const [error, setError] = useState("");
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: name === "gender" ? value === "true" : value });

// // //     // Kiểm tra email
// // //     if (name === "email") {
// // //       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // //       setErrors((prev) => ({
// // //         ...prev,
// // //         email: emailPattern.test(value) ? "" : "Email không hợp lệ!",
// // //       }));
// // //     }

// // //     // Kiểm tra số điện thoại (phải có 10 số)
// // //     if (name === "phone") {
// // //       setErrors((prev) => ({
// // //         ...prev,
// // //         phone: /^\d{10}$/.test(value) ? "" : "Số điện thoại phải có đúng 10 chữ số!",
// // //       }));
// // //     }
// // //   };

// // //   const handleAuth = async (e) => {
// // //     e.preventDefault();
// // //     setError("");

// // //     // Kiểm tra nếu còn lỗi thì không submit
// // //     if (errors.email || errors.phone) {
// // //       setError("Vui lòng sửa lỗi trước khi tiếp tục!");
// // //       return;
// // //     }

// // //     try {
// // //       const url = isRegistering
// // //         ? "https://phamdangtuc-001-site1.ntempurl.com/api/users"
// // //         : "https://phamdangtuc-001-site1.ntempurl.com/api/login";

// // //       const response = await fetch(url, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(formData),
// // //       });

// // //       if (!response.ok) {
// // //         const errorData = await response.json();
// // //         throw new Error(errorData.message || "Thao tác thất bại, vui lòng thử lại!");
// // //       }

// // //       alert(isRegistering ? "Đăng ký thành công!" : "Đăng nhập thành công!");
// // //       navigate("/");
// // //     } catch (err) {
// // //       setError(err.message || "Lỗi kết nối đến máy chủ!");
// // //     }
// // //   };

// // //   return (
// // //     <section className="bg-[#dfa674] min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
// // //       <div className="bg-[#dfa674] rounded-2xl flex max-w-7xl w-full mx-auto p-12 items-center min-h-[600px] ">
// // //         <div className="w-full md:w-1/2 px-4 md:px-12">
// // //           <h2 className="font-bold text-4xl text-[#915621]">
// // //             {isRegistering ? "Đăng ký" : "Đăng nhập"}
// // //           </h2>
// // //           <p className="text-lg mt-4 text-[#915621]">
// // //             {isRegistering ? "Tạo tài khoản mới" : "Nếu bạn đã có tài khoản, hãy đăng nhập ngay."}
// // //           </p>
// // //           <form onSubmit={handleAuth} className="flex flex-col gap-6 mt-12">
// // //             {isRegistering && (
// // //               <input
// // //                 type="text"
// // //                 name="username"
// // //                 placeholder="Tên đăng nhập"
// // //                 value={formData.username}
// // //                 onChange={handleChange}
// // //                 className="pl-12 pr-4 py-3 w-full border rounded-xl text-lg"
// // //                 required
// // //               />
// // //             )}

// // //             {/* Email */}
// // //             <input
// // //               type="email"
// // //               name="email"
// // //               placeholder="Email"
// // //               value={formData.email}
// // //               onChange={handleChange}
// // //               className="pl-12 pr-4 py-3 w-full border rounded-xl text-lg"
// // //               required
// // //             />
// // //             {errors.email && <p className="text-red-500 text-base">{errors.email}</p>}

// // //             {/* Password */}
// // //             <input
// // //               type="password"
// // //               name="password"
// // //               placeholder="Mật khẩu"
// // //               value={formData.password}
// // //               onChange={handleChange}
// // //               className="pl-12 pr-4 py-3 w-full border rounded-xl text-lg"
// // //               required
// // //             />

// // //             {isRegistering && (
// // //               <>
// // //                 {/* Full Name */}
// // //                 <input
// // //                   type="text"
// // //                   name="fullName"
// // //                   placeholder="Họ và tên"
// // //                   value={formData.fullName}
// // //                   onChange={handleChange}
// // //                   className="pl-12 pr-4 py-3 w-full border rounded-xl text-lg"
// // //                   required
// // //                 />

// // //                 {/* Gender */}
// // //                 <select
// // //                   name="gender"
// // //                   value={formData.gender}
// // //                   onChange={handleChange}
// // //                   className="pl-12 pr-4 py-3 w-full border rounded-xl text-lg bg-white"
// // //                 >
// // //                   <option value="true">Nam</option>
// // //                   <option value="false">Nữ</option>
// // //                 </select>

// // //                 {/* Date of Birth */}
// // //                 <input
// // //                   type="date"
// // //                   name="dateOfBirth"
// // //                   value={formData.dateOfBirth}
// // //                   onChange={handleChange}
// // //                   className="pl-12 pr-4 py-3 w-full border rounded-xl text-lg"
// // //                   required
// // //                 />

// // //                 {/* Address */}
// // //                 <input
// // //                   type="text"
// // //                   name="address"
// // //                   placeholder="Địa chỉ"
// // //                   value={formData.address}
// // //                   onChange={handleChange}
// // //                   className="pl-12 pr-4 py-3 w-full border rounded-xl text-lg"
// // //                   required
// // //                 />

// // //                 {/* Phone */}
// // //                 <input
// // //                   type="text"
// // //                   name="phone"
// // //                   placeholder="Số điện thoại"
// // //                   value={formData.phone}
// // //                   onChange={handleChange}
// // //                   className="pl-12 pr-4 py-3 w-full border rounded-xl text-lg"
// // //                   required
// // //                 />
// // //                 {errors.phone && <p className="text-red-500 text-base">{errors.phone}</p>}
// // //               </>
// // //             )}

// // //             {/* Hiển thị lỗi chung */}
// // //             {error && <p className="text-red-500 text-base">{error}</p>}

// // //             <button
// // //               type="submit"
// // //               className="bg-[#915621] text-white py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#002c7424] font-medium text-lg"
// // //             >
// // //               {isRegistering ? "Đăng ký" : "Đăng nhập"}
// // //             </button>
// // //           </form>

// // //           <div className="mt-8 text-base flex justify-between items-center">
// // //             <p className="mr-3">
// // //               {isRegistering ? "Đã có tài khoản?" : "Chưa có tài khoản?"}
// // //             </p>
// // //             <button
// // //               onClick={() => setIsRegistering(!isRegistering)}
// // //               className="bg-[#915621] text-white py-3 px-8 rounded-xl hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
// // //             >
// // //               {isRegistering ? "Đăng nhập" : "Đăng ký"}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <div className="md:block hidden w-1/2 h-full">
// // //           <img
// // //             className="rounded-2xl w-full h-[550px] object-cover"
// // //             src={xx}
// // //             alt="Register illustration"
// // //           />
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default RegisterLogin;


// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import xx from '../assets/xx.jpg';

// // // const RegisterLogin = () => {
// // //   const [formData, setFormData] = useState({
// // //     username: "",
// // //     password: "",
// // //     roleID: ""
// // //   });

// // //   const [error, setError] = useState("");
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [name]: value
// // //     }));
// // //   };

// // //   const handleRegister = async (e) => {
// // //     e.preventDefault();
// // //     setError("");

// // //     try {
// // //       const response = await fetch(
// // //         "https://decalxeapi-backend-production.up.railway.app/api/Auth/register",
// // //         {
// // //           method: "POST",
// // //           headers: { "Content-Type": "application/json" },
// // //           body: JSON.stringify(formData),
// // //         }
// // //       );

// // //       if (!response.ok) {
// // //         const errorData = await response.json();
// // //         throw new Error(errorData.message || "Đăng ký thất bại!");
// // //       }

// // //       alert("Đăng ký thành công!");
// // //       navigate("/");
// // //     } catch (err) {
// // //       setError(err.message || "Lỗi kết nối đến máy chủ!");
// // //     }
// // //   };

// // //   return (
// // //     <section className="bg-[#dfa674] min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
// // //       <div className="bg-[#dfa674] rounded-2xl flex max-w-7xl w-full mx-auto p-12 items-center min-h-[600px]">
// // //         <div className="w-full md:w-1/2 px-4 md:px-12">
// // //           <h2 className="font-bold text-4xl text-[#915621]">Đăng ký</h2>
// // //           <p className="text-lg mt-4 text-[#915621]">Tạo tài khoản quản lý, quản trị viên hoặc thiết kế viên</p>

// // //           <form onSubmit={handleRegister} className="flex flex-col gap-6 mt-12">
// // //             <input
// // //               type="text"
// // //               name="username"
// // //               placeholder="Tên đăng nhập"
// // //               value={formData.username}
// // //               onChange={handleChange}
// // //               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
// // //               required
// // //             />

// // //             <input
// // //               type="password"
// // //               name="password"
// // //               placeholder="Mật khẩu"
// // //               value={formData.password}
// // //               onChange={handleChange}
// // //               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
// // //               required
// // //             />

// // //             <select
// // //               name="roleID"
// // //               value={formData.roleID}
// // //               onChange={handleChange}
// // //               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg bg-white"
// // //               required
// // //             >
// // //               <option value="ROLE_ADMIN">Quản trị viên</option>
// // //               <option value="ROLE_MANAGER">Quản lý</option>
// // //               <option value="ROLE_DESIGNER">Thiết kế viên</option>
// // //             </select>

// // //             {error && <p className="text-red-500 text-base">{error}</p>}

// // //             <button
// // //               type="submit"
// // //               className="bg-[#915621] text-white py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#002c7424] font-medium text-lg"
// // //             >
// // //               Đăng ký
// // //             </button>
// // //           </form>
// // //         </div>

// // //         <div className="md:block hidden w-1/2 h-full">
// // //           <img
// // //             className="rounded-2xl w-full h-[550px] object-cover"
// // //             src={xx}
// // //             alt="Register illustration"
// // //           />
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default RegisterLogin;


// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import xx from "../assets/xx.jpg";

// // // const RegisterLogin = () => {
// // //   const [formData, setFormData] = useState({
// // //     username: "",
// // //     password: "",
// // //     roleID: "", // bắt buộc chọn từ dropdown
// // //   });

// // //   const [error, setError] = useState("");
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleRegister = async (e) => {
// // //     e.preventDefault();
// // //     setError("");

// // //     // Kiểm tra dữ liệu trước khi gửi
// // //    if (!formData.username || !formData.password || !formData.roleID) {
// // //     setError("Vui lòng điền đầy đủ thông tin.");
// // //     return;
// // //   }
// // //   if (formData.password.length < 6) {
// // //       setError("Mật khẩu phải có ít nhất 6 ký tự.");
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch(
// // //         "https://decalxeapi-backend-production.up.railway.app/api/Auth/register",
// // //         {
// // //           method: "POST",
// // //           headers: { "Content-Type": "application/json" },
// // //           body: JSON.stringify(formData),
// // //         }
// // //       );

// // //       if (!response.ok) {
// // //         const errorData = await response.json();
// // //         console.error("Lỗi đăng ký:", errorData);
// // //         throw new Error(
// // //           errorData?.message ||
// // //             errorData?.title ||
// // //             "Đăng ký thất bại, vui lòng kiểm tra lại!"
// // //         );
// // //       }

// // //       alert("Đăng ký thành công!");
// // //       navigate("/");
// // //     } catch (err) {
// // //       setError(err.message || "Lỗi kết nối đến máy chủ!");
// // //     }
// // //   };

// // //   return (
// // //     <section className="bg-[#dfa674] min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
// // //       <div className="bg-[#dfa674] rounded-2xl flex max-w-7xl w-full mx-auto p-12 items-center min-h-[600px]">
// // //         <div className="w-full md:w-1/2 px-4 md:px-12">
// // //           <h2 className="font-bold text-4xl text-[#915621]">Đăng ký</h2>
// // //           <p className="text-lg mt-4 text-[#915621]">
// // //             Tạo tài khoản quản trị viên, quản lý hoặc thiết kế viên
// // //           </p>

// // //           <form onSubmit={handleRegister} className="flex flex-col gap-6 mt-12">
// // //             <input
// // //               type="text"
// // //               name="username"
// // //               placeholder="Tên đăng nhập"
// // //               value={formData.username}
// // //               onChange={handleChange}
// // //               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
// // //               required
// // //             />

// // //             <input
// // //               type="password"
// // //               name="password"
// // //               placeholder="Mật khẩu"
// // //               value={formData.password}
// // //               onChange={handleChange}
// // //               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
// // //               required
// // //             />

// // //             <select
// // //               name="roleID"
// // //               value={formData.roleID}
// // //               onChange={handleChange}
// // //               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg bg-white"
// // //               required
// // //             >
// // //               <option value="">-- Chọn vai trò --</option>
// // //               <option value="ROLE_ADMIN">Quản trị viên</option>
// // //               <option value="ROLE_MANAGER">Quản lý</option>
// // //               <option value="ROLE_DESIGNER">Thiết kế viên</option>
// // //             </select>

// // //             {error && <p className="text-red-500 text-base">{error}</p>}

// // //             <button
// // //               type="submit"
// // //               className="bg-[#915621] text-white py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#002c7424] font-medium text-lg"
// // //             >
// // //               Đăng ký
// // //             </button>
// // //           </form>
// // //         </div>

// // //         <div className="md:block hidden w-1/2 h-full">
// // //           <img
// // //             className="rounded-2xl w-full h-[550px] object-cover"
// // //             src={xx}
// // //             alt="Register illustration"
// // //           />
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default RegisterLogin;


// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import xx from "../assets/xx.jpg";

// // const RegisterLogin = () => {
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     password: "",
// //     roleID: "",
// //   });

// //   const [error, setError] = useState("");
// //   const [availableRoles, setAvailableRoles] = useState([]);
// //   const navigate = useNavigate();

// //   // Lấy role hiện tại từ localStorage
// //   useEffect(() => {
// //     const role = localStorage.getItem("userRole");
// //     const token = localStorage.getItem("token");

// //     if (!token || !role) {
// //       setError("Bạn cần đăng nhập để tạo tài khoản.");
// //       return;
// //     }

// //     // Cập nhật danh sách quyền có thể tạo dựa vào vai trò hiện tại
// //     if (role === "ROLE_ADMIN") {
// //       setAvailableRoles(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_DESIGNER"]);
// //     } else if (role === "ROLE_MANAGER") {
// //       setAvailableRoles(["ROLE_MANAGER", "ROLE_DESIGNER"]);
// //     } else if (role === "ROLE_DESIGNER") {
// //       setAvailableRoles(["ROLE_DESIGNER"]);
// //     }
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleRegister = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       setError("Vui lòng đăng nhập trước.");
// //       return;
// //     }

// //     if (!formData.username || !formData.password || !formData.roleID) {
// //       setError("Vui lòng điền đầy đủ thông tin.");
// //       return;
// //     }

// //     try {
// //       const response = await fetch(
// //         "https://decalxeapi-backend-production.up.railway.app/api/Auth/register",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             "Authorization": `Bearer ${token}`,
// //           },
// //           body: JSON.stringify(formData),
// //         }
// //       );

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         console.error("Lỗi đăng ký:", errorData);
// //         throw new Error(
// //           errorData?.message || errorData?.title || "Đăng ký thất bại."
// //         );
// //       }

// //       alert("Đăng ký thành công!");
// //       navigate("/");
// //     } catch (err) {
// //       setError(err.message || "Lỗi kết nối đến máy chủ.");
// //     }
// //   };
  

// //   return (
// //     <section className="bg-[#dfa674] min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
// //       <div className="bg-[#dfa674] rounded-2xl flex max-w-7xl w-full mx-auto p-12 items-center min-h-[600px]">
// //         <div className="w-full md:w-1/2 px-4 md:px-12">
// //           <h2 className="font-bold text-4xl text-[#915621]">Đăng ký</h2>
// //           <p className="text-lg mt-4 text-[#915621]">
// //             Tạo tài khoản theo phân quyền
// //           </p>

// //           <form onSubmit={handleRegister} className="flex flex-col gap-6 mt-12">
// //             <input
// //               type="text"
// //               name="username"
// //               placeholder="Tên đăng nhập"
// //               value={formData.username}
// //               onChange={handleChange}
// //               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
// //               required
// //             />

// //             <input
// //               type="password"
// //               name="password"
// //               placeholder="Mật khẩu"
// //               value={formData.password}
// //               onChange={handleChange}
// //               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
// //               required
// //             />

// //             <select
// //               name="roleID"
// //               value={formData.roleID}
// //               onChange={handleChange}
// //               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg bg-white"
// //               required
// //             >
// //               <option value="">-- Chọn vai trò --</option>
// //               {availableRoles.map((role) => (
// //                 <option key={role} value={role}>
// //                   {role === "ROLE_ADMIN" && "Quản trị viên"}
// //                   {role === "ROLE_MANAGER" && "Quản lý"}
// //                   {role === "ROLE_DESIGNER" && "Thiết kế viên"}
// //                 </option>
// //               ))}
// //             </select>

// //             {error && <p className="text-red-500 text-base">{error}</p>}

// //             <button
// //               type="submit"
// //               className="bg-[#915621] text-white py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#002c7424] font-medium text-lg"
// //             >
// //               Đăng ký
// //             </button>
// //           </form>
// //         </div>

// //         <div className="md:block hidden w-1/2 h-full">
// //           <img
// //             className="rounded-2xl w-full h-[550px] object-cover"
// //             src={xx}
// //             alt="Register illustration"
// //           />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default RegisterLogin;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import xx from "../assets/xx.jpg";

// const RegisterLogin = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     roleID: "",
//   });

//   const [error, setError] = useState("");
//   const [availableRoles, setAvailableRoles] = useState([]);
//   const navigate = useNavigate();

//   // Helper để hiển thị tên vai trò
//   const getRoleLabel = (role) => {
//     switch (role) {
//       case "ROLE_ADMIN":
//         return "Quản trị viên";
//       case "ROLE_MANAGER":
//         return "Quản lý";
//       case "ROLE_DESIGNER":
//         return "Thiết kế viên";
//       default:
//         return role;
//     }
//   };

// //   // Lấy role hiện tại từ localStorage
// //   useEffect(() => {
// //     // const role = localStorage.getItem("userRole");
// //     // const token = localStorage.getItem("token");
// //     const userStr = localStorage.getItem("user");
// //   const role = userStr ? JSON.parse(userStr).role : null;
// //   const token = localStorage.getItem("token");
// //      console.log("ROLE hiện tại:", role);
// //     if (!token || !role) {
// //       setError("Bạn cần đăng nhập để tạo tài khoản.");
// //       return;
// //     }

// //     // Cập nhật danh sách quyền có thể tạo dựa vào vai trò hiện tại
// //     if (role === "ROLE_ADMIN") {
// //       setAvailableRoles(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_DESIGNER"]);
// //     } else if (role === "ROLE_MANAGER") {
// //       setAvailableRoles(["ROLE_MANAGER", "ROLE_DESIGNER"]);
// //     } else if (role === "ROLE_DESIGNER") {
// //       setAvailableRoles(["ROLE_DESIGNER"]);
// //     }
// //      console.log("Danh sách role cho phép:", availableRoles);
// //   }, []);

// //   // Thêm useEffect mới để kiểm tra giá trị đã cập nhật
// // useEffect(() => {
// //   console.log("Danh sách role cho phép (sau khi cập nhật):", availableRoles);
// // }, [availableRoles]);

// useEffect(() => {
//   const userStr = localStorage.getItem("user");
//   const token = localStorage.getItem("token");

//   if (!token || !userStr) {
//     setError("Bạn cần đăng nhập để tạo tài khoản.");
//     return;
//   }

//   const user = JSON.parse(userStr);
//   const role = user.role;
//   console.log("ROLE hiện tại:", role);

//   // Cập nhật danh sách quyền có thể tạo dựa vào vai trò hiện tại
//   if (role === "ROLE_ADMIN" || role === "Admin") {
//     setAvailableRoles(["ROLE_MANAGER", "ROLE_DESIGNER"]);
//   } else if (role === "ROLE_MANAGER" || role === "Manager") {
//     setAvailableRoles(["ROLE_DESIGNER"]);
//   } else{
//     setAvailableRoles([]);
//   }
//   console.log("Danh sách role cho phép:", availableRoles);
// }, []);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Vui lòng đăng nhập trước.");
//       return;
//     }

//     if (!formData.username || !formData.password || !formData.roleID) {
//       setError("Vui lòng điền đầy đủ thông tin.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://decalxeapi-backend-production.up.railway.app/api/Auth/register",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Lỗi đăng ký:", errorData);
//         throw new Error(
//           errorData?.message || errorData?.title || "Đăng ký thất bại."
//         );
//       }

//       alert("Đăng ký thành công!");
//       navigate("/");
//     } catch (err) {
//       setError(err.message || "Lỗi kết nối đến máy chủ.");
//     }
//   };

//   return (
//     <section className="bg-[#dfa674] min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="bg-[#dfa674] rounded-2xl flex max-w-7xl w-full mx-auto p-12 items-center min-h-[600px]">
//         <div className="w-full md:w-1/2 px-4 md:px-12">
//           <h2 className="font-bold text-4xl text-[#915621]">Đăng ký</h2>
//           <p className="text-lg mt-4 text-[#915621]">
//             Tạo tài khoản theo phân quyền
//           </p>


//           <form onSubmit={handleRegister} className="flex flex-col gap-6 mt-12">
//             <input
//               type="text"
//               name="username"
//               placeholder="Tên đăng nhập"
//               value={formData.username}
//               onChange={handleChange}
//               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
//               required
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Mật khẩu"
//               value={formData.password}
//               onChange={handleChange}
//               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
//               required
//             />

//             <select
//               name="roleID"
//               value={formData.roleID}
//               onChange={handleChange}
//               className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg bg-white"
//               required
//             >
//               <option value="">-- Chọn vai trò --</option>
//               {availableRoles.map((role) => (
//                 <option key={role} value={role}>
//                   {getRoleLabel(role)}
//                 </option>
//               ))}
//             </select>

//             {error && <p className="text-red-600 text-base">{error}</p>}

//             <button
//               type="submit"
//               className="bg-[#915621] text-white py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#002c7424] font-medium text-lg"
//             >
//               Đăng ký
//             </button>
//           </form>
//         </div>

//         <div className="md:block hidden w-1/2 h-full">
//           <img
//             className="rounded-2xl w-full h-[550px] object-cover"
//             src={xx}
//             alt="Register illustration"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RegisterLogin;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import xx from "../assets/xx.jpg";

const RegisterLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    roleID: "",
  });

  const [error, setError] = useState("");
  const [availableRoles, setAvailableRoles] = useState([]);
  const navigate = useNavigate();

  const getRoleLabel = (role) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "Quản trị viên";
      case "ROLE_MANAGER":
        return "Quản lý";
      case "ROLE_DESIGNER":
        return "Thiết kế viên";
      default:
        return role;
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !userStr) {
      setError("Bạn cần đăng nhập để tạo tài khoản.");
      return;
    }

    const user = JSON.parse(userStr);
    const role = user.role;
    console.log("ROLE hiện tại:", role);

    if (role === "ROLE_ADMIN" || role === "Admin") {
      setAvailableRoles(["ROLE_MANAGER", "ROLE_DESIGNER"]);
    } else if (role === "ROLE_MANAGER" || role === "Manager") {
      setAvailableRoles(["ROLE_DESIGNER"]);
    } else {
      setAvailableRoles([]); // Không có quyền
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vui lòng đăng nhập trước.");
      return;
    }

    if (!formData.username || !formData.password || !formData.roleID) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const response = await fetch(
        "https://decalxeapi-backend-production.up.railway.app/api/Auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Lỗi đăng ký:", errorData);
        throw new Error(
          errorData?.message || errorData?.title || "Đăng ký thất bại."
        );
      }

      alert("Đăng ký thành công!");
      navigate("/");
    } catch (err) {
      setError(err.message || "Lỗi kết nối đến máy chủ.");
    }
  };

  return (
    <section className="bg-[#dfa674] min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-[#dfa674] rounded-2xl flex max-w-7xl w-full mx-auto p-12 items-center min-h-[600px]">
        <div className="w-full md:w-1/2 px-4 md:px-12">
          <h2 className="font-bold text-4xl text-[#915621]">Đăng ký</h2>
          <p className="text-lg mt-4 text-[#915621]">
            Tạo tài khoản theo phân quyền
          </p>

          {availableRoles.length === 0 ? (
            <div className="mt-10 text-red-700 text-xl font-semibold">
              Bạn không có quyền tạo tài khoản.
            </div>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-6 mt-12">
              <input
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                value={formData.username}
                onChange={handleChange}
                className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
                required
              />

              <select
                name="roleID"
                value={formData.roleID}
                onChange={handleChange}
                className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg bg-white"
                required
              >
                <option value="">-- Chọn vai trò --</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {getRoleLabel(role)}
                  </option>
                ))}
              </select>

              {error && <p className="text-red-600 text-base">{error}</p>}

              <button
                type="submit"
                className="bg-[#915621] text-white py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#002c7424] font-medium text-lg"
              >
                Đăng ký
              </button>
            </form>
          )}
        </div>

        <div className="md:block hidden w-1/2 h-full">
          <img
            className="rounded-2xl w-full h-[550px] object-cover"
            src={xx}
            alt="Register illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterLogin;
