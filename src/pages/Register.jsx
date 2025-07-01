import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import xx from "../assets/xx.jpg";

const Register = () => {
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
      case "ROLE_SALES":
        return "Nhân viên bán hàng";
      case "ROLE_TECHNICIAN":
        return "Kỹ thuật viên"; 
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
      setAvailableRoles(["ROLE_MANAGER", "ROLE_DESIGNER", "ROLE_SALES", "ROLE_TECHNICIAN"]);
    } else if (role === "ROLE_MANAGER" || role === "Manager") {
      // setAvailableRoles(["ROLE_DESIGNER"]);
      setAvailableRoles([]);
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
            Chỉ admin mới được tạo tài khoản
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

export default Register;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import xx from "../assets/xx.jpg";

// const RegisterLogin = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",       // Thêm email
//     password: "",
//     roleID: "",
//   });

//   const [error, setError] = useState("");
//   const [availableRoles, setAvailableRoles] = useState([]);
//   const navigate = useNavigate();

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

//   useEffect(() => {
//     const userStr = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (!token || !userStr) {
//       setError("Bạn cần đăng nhập để tạo tài khoản.");
//       return;
//     }

//     const user = JSON.parse(userStr);
//     const role = user.role;
//     console.log("ROLE hiện tại:", role);

//     if (role === "ROLE_ADMIN" || role === "Admin") {
//       setAvailableRoles(["ROLE_MANAGER", "ROLE_DESIGNER"]);
//     } else if (role === "ROLE_MANAGER" || role === "Manager") {
//       setAvailableRoles(["ROLE_DESIGNER"]);
//     } else {
//       setAvailableRoles([]);
//     }
//   }, []);

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

//     if (!formData.username || !formData.password || !formData.roleID || !formData.email) {
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

//           {availableRoles.length === 0 ? (
//             <div className="mt-10 text-red-700 text-xl font-semibold">
//               Bạn không có quyền tạo tài khoản.
//             </div>
//           ) : (
//             <form onSubmit={handleRegister} className="flex flex-col gap-6 mt-12">
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Tên đăng nhập"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
//                 required
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
//                 required
//               />

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Mật khẩu"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg"
//                 required
//               />

//               <select
//                 name="roleID"
//                 value={formData.roleID}
//                 onChange={handleChange}
//                 className="pl-4 pr-4 py-3 w-full border rounded-xl text-lg bg-white"
//                 required
//               >
//                 <option value="">-- Chọn vai trò --</option>
//                 {availableRoles.map((role) => (
//                   <option key={role} value={role}>
//                     {getRoleLabel(role)}
//                   </option>
//                 ))}
//               </select>

//               {error && <p className="text-red-600 text-base">{error}</p>}

//               <button
//                 type="submit"
//                 className="bg-[#915621] text-white py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#002c7424] font-medium text-lg"
//               >
//                 Đăng ký
//               </button>
//             </form>
//           )}
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
