// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCart, Menu, ChevronDown } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/slices/userSlice";
// import logo from "../assets/logo.png";

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Lấy thông tin từ Redux
//   const { role, isAuthenticated, username } = useSelector((state) => state.user);
//   console.log("Auth State:", { role, isAuthenticated, username });

//   // Lấy giỏ hàng từ Redux
//   const cart = useSelector((state) => state.cart.items ?? []);
//   const cartItemCount = useSelector((state) => state.cart.items.length);

//   // Xử lý logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     dispatch(logout());
//     navigate("/login");
//   };

//   // State cho menu trên mobile
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [designDropdownOpen, setDesignDropdownOpen] = useState(false);
//   const [decal, setDecal] = useState(false);

//   return (
//     <header className="bg-black text-white py-2 px-6 flex items-center justify-between relative">
//       {/* Logo */}
//       <Link to="/" className="flex items-center space-x-2">
//         <img src={logo} alt="Logo" className="w-16 h-16" />
//         <span className="text-3xl font-bold text-white">Decal</span>
//       </Link>

//       {/* Nút Menu Dropdown (Mobile) */}
//       <div className="relative md:hidden">
//         <button className="text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
//           <Menu />
//         </button>

//         {/* Dropdown Menu */}
//         {menuOpen && (
//           <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg z-50">
//             {role !== "staff" && (
//               <>
//                 <Link to="/" className="block px-4 py-2 hover:bg-gray-800">TRANG CHỦ</Link>

//                 {/* Dropdown Decal */}
//                 <div>
//                   <button className="block w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center justify-between"
//                     onClick={() => setDecal(!decal)}>
//                     DECAL <ChevronDown />
//                   </button>
//                   {decal && (
//                     <div className="bg-gray-900">
//                       <Link to="/design" className="block px-6 py-2 hover:bg-gray-800">TUỲ CHỈNH</Link>
//                       <Link to="/design/templates" className="block px-6 py-2 hover:bg-gray-800">MẪU CÓ SẴN</Link>
//                     </div>
//                   )}
//                 </div>

//                 {/* Dropdown Thiết kế áo */}
//                 <div>
//                   <button className="block w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center justify-between"
//                     onClick={() => setDesignDropdownOpen(!designDropdownOpen)}>
//                     THIẾT KẾ DECAL <ChevronDown />
//                   </button>
//                   {designDropdownOpen && (
//                     <div className="bg-gray-900">
//                       <Link to="/design" className="block px-6 py-2 hover:bg-gray-800">TUỲ CHỈNH</Link>
//                       <Link to="/design/templates" className="block px-6 py-2 hover:bg-gray-800">SẢN PHẨM</Link>
//                     </div>
//                   )}
//                 </div>

//                 <Link to="/lien-he" className="block px-4 py-2 hover:bg-gray-800">LIÊN HỆ</Link>
//                 <Link to="/cart" className="block px-4 py-2 hover:bg-gray-800 flex items-center">
//                   <ShoppingCart />
//                   {totalItems > 0 && (
//                     <span className="ml-2 bg-red-500 text-white rounded-full text-xs px-2">
//                       {totalItems}
//                     </span>
//                   )}
//                 </Link>
//               </>
//             )}

//             {isAuthenticated ? (
//               <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-800">
//                 ĐĂNG XUẤT
//               </button>
//             ) : (
//               <>
//                 <Link to="/login" className="block px-4 py-2 hover:bg-gray-800">ĐĂNG NHẬP</Link>
//                 <Link to="/register" className="block px-4 py-2 hover:bg-gray-800">ĐĂNG KÝ</Link>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Menu trên PC */}
//       <nav className="hidden md:flex gap-6 items-center">
//         {role === "staff" ? (
//           <>
//             <Link to="/staff" className="hover:text-orange-400 text-xl">TRANG NHÂN VIÊN</Link>
//             <Link to="/order-tracking" className="hover:text-orange-400 text-xl">THEO DÕI ĐƠN HÀNG</Link>
//           </>
//         ) : (
//           <>
//             <Link to="/" className="hover:text-orange-400 text-xl">TRANG CHỦ</Link>

//             {/* Các dropdown khác */}
//             <div className="relative group">
//               <button className="hover:text-orange-400 text-xl flex items-center">
//                 THIẾT KẾ DECAL <ChevronDown className="ml-2" />
//               </button>
//               <div className="absolute left-0 top-full w-48 bg-black border border-gray-700 rounded-lg hidden group-hover:block z-50">
//                 <Link to="/design/custom" className="block px-4 py-2 hover:bg-gray-800">TUỲ CHỈNH</Link>
//                 <Link to="/design/mau-co-san" className="block px-4 py-2 hover:bg-gray-800">SẢN PHẨM</Link>
//               </div>
//             </div>

//             <div className="relative group">
//               <button className="hover:text-orange-400 text-xl flex items-center">
//                 DECAL <ChevronDown className="ml-2" />
//               </button>
//               <div className="absolute left-0 top-full max-w-64 w-56 bg-black border border-gray-700 rounded-lg hidden group-hover:block z-50">
//                 <Link to="/design/bang-gia-dong-phuc" className="block px-4 py-2 hover:bg-gray-800">BẢNG GIÁ DECAL XE MÁY</Link>
//                 <Link to="/design/bang-gia-ao-lop" className="block px-4 py-2 hover:bg-gray-800">BẢNG GIÁ DECAL XE HƠI</Link>
//                 <Link to="/design/bang-gia-phu-kien" className="block px-4 py-2 hover:bg-gray-800">BẢNG GIÁ PHỤ KIỆN</Link>
//                 <Link to="/design/bang-gia-dich-vu" className="block px-4 py-2 hover:bg-gray-800">BẢNG GIÁ DỊCH VỤ</Link>
//               </div>
//             </div>

//             <div className="relative group">
//               <button className="hover:text-orange-400 text-xl flex items-center">
//                 BLOG <ChevronDown className="ml-2" />
//               </button>
//               <div className="absolute left-0 top-full max-w-64 w-56 bg-black border border-gray-700 rounded-lg hidden group-hover:block z-50">
//                 <Link to="/blog" className="block px-4 py-2 hover:bg-gray-800">THÔNG TIN</Link>
//                 <Link to="/blog/class" className="block px-4 py-2 hover:bg-gray-800">DECAL</Link>
//                 <Link to="/blog/b" className="block px-4 py-2 hover:bg-gray-800">CẨM NANG</Link>
//               </div>
//             </div>

//             <Link to="/lien-he" className="hover:text-orange-400 text-xl">LIÊN HỆ</Link>
//             <Link to="/cart" className="hover:text-orange-400 relative">
//               <ShoppingCart />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
//                   {cartItemCount}
//                 </span>
//               )}
//             </Link>
//           </>
//         )}

//         {/* Hiển thị Trang Cá Nhân */}
//         {isAuthenticated && (
//           <div className="relative group">
//             <button className="hover:text-orange-400 text-xl flex items-center">
//               {username || "TRANG CÁ NHÂN"} <ChevronDown className="ml-2" />
//             </button>
//             <div className="absolute right-0 top-full w-48 bg-black border border-gray-700 rounded-lg hidden group-hover:block z-50">
//               {role === "member" && <Link to="/member" className="block px-4 py-2 hover:bg-gray-800">TRANG CÁ NHÂN</Link>}
//               {role === "staff" && <Link to="/member" className="block px-4 py-2 hover:bg-gray-800">TRANG CÁ NHÂN</Link>}
//               <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-800">ĐĂNG XUẤT</button>
//             </div>
//           </div>
//         )}

//         {!isAuthenticated && (
//           <>
//             <Link to="/login" className="hover:text-orange-400 text-xl">ĐĂNG NHẬP</Link>
//             <Link to="/register" className="hover:text-orange-400 text-xl">ĐĂNG KÝ</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import logo from "../assets/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy thông tin từ Redux
  const { role, isAuthenticated, username } = useSelector((state) => state.user);
  console.log("Auth State:", { role, isAuthenticated, username });

  // Lấy giỏ hàng từ Redux
  const cart = useSelector((state) => state.cart.items ?? []);
  const cartItemCount = useSelector((state) => state.cart.items.length);

  // Xử lý logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  // State cho menu trên mobile
  const [menuOpen, setMenuOpen] = useState(false);
  const [designDropdownOpen, setDesignDropdownOpen] = useState(false);
  const [decal, setDecal] = useState(false);

  return (
    <header className="bg-black text-white py-2 px-6 flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-16 h-16" />
        <span className="text-3xl font-bold text-white">Decal</span>
      </Link>

      {/* Nút Menu Dropdown (Mobile) */}
      <div className="relative md:hidden">
        <button className="text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg z-50">
            {role !== "Admin" && (
              <>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-800">TRANG CHỦ</Link>

                {/* Dropdown Decal */}
                <div>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center justify-between"
                    onClick={() => setDecal(!decal)}>
                    DECAL <ChevronDown />
                  </button>
                  {decal && (
                    <div className="bg-gray-900">
                      <Link to="/design" className="block px-6 py-2 hover:bg-gray-800">TUỲ CHỈNH</Link>
                      <Link to="/design/templates" className="block px-6 py-2 hover:bg-gray-800">MẪU CÓ SẴN</Link>
                    </div>
                  )}
                </div>

                {/* Dropdown Thiết kế áo */}
                <div>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center justify-between"
                    onClick={() => setDesignDropdownOpen(!designDropdownOpen)}>
                    THIẾT KẾ DECAL <ChevronDown />
                  </button>
                  {designDropdownOpen && (
                    <div className="bg-gray-900">
                      <Link to="/design" className="block px-6 py-2 hover:bg-gray-800">TUỲ CHỈNH</Link>
                      <Link to="/design/templates" className="block px-6 py-2 hover:bg-gray-800">SẢN PHẨM</Link>
                    </div>
                  )}
                </div>

                <Link to="/lien-he" className="block px-4 py-2 hover:bg-gray-800">LIÊN HỆ</Link>
                {/* <Link to="/cart" className="block px-4 py-2 hover:bg-gray-800 flex items-center">
                  <ShoppingCart />
                  {totalItems > 0 && (
                    <span className="ml-2 bg-red-500 text-white rounded-full text-xs px-2">
                      {totalItems}
                    </span>
                  )}
                </Link> */}
              </>
            )}

            {isAuthenticated ? (
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-800">
                ĐĂNG XUẤT
              </button>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-800">ĐĂNG NHẬP</Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-gray-800">ĐĂNG KÝ</Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Menu trên PC */}
      <nav className="hidden md:flex gap-6 items-center">
        {role === "Admin" ? (
          <>
            <Link to="/Account" className="hover:text-orange-400 text-xl">TÀI KHOẢN NHÂN VIÊN</Link>
            <Link to="/store" className="hover:text-orange-400 text-xl">CÁC CỬA HÀNG</Link>
            <Link to="/employees" className="hover:text-orange-400 text-xl">NHÂN VIÊN</Link>
            {/* <Link to="/order-tracking" className="hover:text-orange-400 text-xl">THEO DÕI ĐƠN HÀNG</Link> */}
          </>
        ) : role === "Manager" ? (
          <>
            <div>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center justify-between"
                    onClick={() => setDesignDropdownOpen(!designDropdownOpen)}>
                    THIẾT KẾ DECAL <ChevronDown />
                  </button>
                  {designDropdownOpen && (
                    <div className="bg-gray-900">
                      <Link to="/Decal-template" className="hover:text-orange-400 text-base">QUẢN LÝ MẪU DECAL</Link><br/>
                      <Link to="/Decal-type" className="hover:text-orange-400 text-base">QUẢN LÝ LOẠI DECAL</Link>  
                    </div>
                  )}
                </div>
          </>
        ) : (
          <>
            <Link to="/" className="hover:text-orange-400 text-xl">TRANG CHỦ</Link>

            {/* Các dropdown khác */}
            <div className="relative group">
              {/* <button className="hover:text-orange-400 text-xl flex items-center">
                THIẾT KẾ DECAL <ChevronDown className="ml-2" />
              </button> */}
              <div className="absolute left-0 top-full w-48 bg-black border border-gray-700 rounded-lg hidden group-hover:block z-50">
                {/* <Link to="/design/custom" className="block px-4 py-2 hover:bg-gray-800">TUỲ CHỈNH</Link> */}
                <Link to="/decal-service" className="block px-4 py-2 hover:bg-gray-800">DỊCH VỤ</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="hover:text-orange-400 text-xl flex items-center">
                DECAL <ChevronDown className="ml-2" />
              </button>
              <div className="absolute left-0 top-full max-w-64 w-56 bg-black border border-gray-700 rounded-lg hidden group-hover:block z-50">
                <Link to="/design/bang-gia-dong-phuc" className="block px-4 py-2 hover:bg-gray-800">BẢNG GIÁ DECAL XE MÁY</Link>
                {/* <Link to="/design/bang-gia-ao-lop" className="block px-4 py-2 hover:bg-gray-800">BẢNG GIÁ DECAL XE HƠI</Link> */}
                {/* <Link to="/design/bang-gia-phu-kien" className="block px-4 py-2 hover:bg-gray-800">BẢNG GIÁ PHỤ KIỆN</Link> */}
                <Link to="/design/bang-gia-dich-vu" className="block px-4 py-2 hover:bg-gray-800">BẢNG GIÁ DỊCH VỤ</Link>
              </div>
            </div>

            {/* <div className="relative group">
              <button className="hover:text-orange-400 text-xl flex items-center">
                BLOG <ChevronDown className="ml-2" />
              </button>
              <div className="absolute left-0 top-full max-w-64 w-56 bg-black border border-gray-700 rounded-lg hidden group-hover:block z-50">
                <Link to="/blog" className="block px-4 py-2 hover:bg-gray-800">THÔNG TIN</Link>
                <Link to="/blog/class" className="block px-4 py-2 hover:bg-gray-800">DECAL</Link>
                <Link to="/blog/b" className="block px-4 py-2 hover:bg-gray-800">CẨM NANG</Link>
              </div>
            </div> */}

            <Link to="/lien-he" className="hover:text-orange-400 text-xl">LIÊN HỆ</Link>
            {/* <Link to="/cart" className="hover:text-orange-400 relative"> */}
              {/* <ShoppingCart /> */}
              {/* {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
                  {cartItemCount}
                </span>
              )} */}
            {/* </Link> */}
          </>
        )}

        {/* Hiển thị Trang Cá Nhân */}
        {isAuthenticated && (
          <div className="relative group">
            <button className="hover:text-orange-400 text-xl flex items-center">
              {username || "TRANG CÁ NHÂN"} <ChevronDown className="ml-2" />
            </button>
            <div className="absolute right-0 top-full w-48 bg-black border border-gray-700 rounded-lg hidden group-hover:block z-50">
              {role === "ROLE_ADMIN" && <Link to="/member" className="block px-4 py-2 hover:bg-gray-800">TRANG CÁ NHÂN</Link>}
              {role === "ROLE_MANAGER" && <Link to="/member" className="block px-4 py-2 hover:bg-gray-800">TRANG CÁ NHÂN</Link>}
              {role === "ROLE_DESIGNER" && <Link to="/member" className="block px-4 py-2 hover:bg-gray-800">TRANG CÁ NHÂN</Link>}
              {/* Nút Đăng Ký hiện sau khi đã login */}
              {role === "Admin" && (
                 <Link to="/register" className="block px-4 py-2 hover:bg-gray-800">
                    ĐĂNG KÝ TÀI KHOẢN CHO NHÂN VIÊN
                </Link>
              )}

              {/* <Link to="/register" className="block px-4 py-2 hover:bg-gray-800">ĐĂNG KÝ TÀI KHOẢN CHO NHÂN VIÊN</Link> */}
              <Link to="/change-password" className="block px-4 py-2 hover:bg-gray-800"> ĐỔI MẬT KHẨU</Link>

              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-800">ĐĂNG XUẤT</button>
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <>
            <Link to="/login" className="hover:text-orange-400 text-xl">ĐĂNG NHẬP</Link>
            <Link to="/register" className="hover:text-orange-400 text-xl">ĐĂNG KÝ</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;