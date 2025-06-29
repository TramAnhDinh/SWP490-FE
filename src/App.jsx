import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import DesignerPage from './pages/DesignerPage';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminPage from "./pages/AdminPage";
import MemberPage from './pages/MemberPage';
import OrderDetail from './pages/OrderDetail';

import NewProductCarousel from './components/NewProductCarousel';
import ContactPage from './pages/ContactPage'; 
import PricingTable from './pages/PricingTable';
import PricingClass from './pages/PricingClass';
// import PricingAccessory from './pages/PricingAccessory';
import PricingService from './pages/PricingService';
import DesignSamples from './pages/DesignSamples';
import CheckoutConfirmation from './pages/CheckoutConfirmation';
import InfoPage from './pages/InfoPage';
import ArticleDetail from './pages/ArticleDetail';
import NewsPage from './pages/NewsPage';
import NewsDetail from './pages/NewsDetail';
import HandPage from './pages/HandPage';
import HandDetail from './pages/HandDetail';
import OrderStatus from './pages/OrderStatus';
import OrderTracking from './pages/OrderTracking';
import ProfilePage from './pages/ProfilePage';
import PaymentCallback from "./pages/PaymentCallback";
import CheckPaymentSuccess from "./pages/CheckPaymentSucces";
import CheckPaymentFailed from "./pages/CheckPaymentFaild";
import ChangePassword from "./pages/ChangePassword";
import StoreListPage from './pages/StoreListPage';

// Component bảo vệ route dựa trên role
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, isAuthenticated } = useSelector((state) => state.user);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Chuyển đổi role string thành roleId tương ứng
  let roleId;
  switch(role) {
    case "Admin":
      roleId = "ROLE_ADMIN";
      break;
    case "Manager":
      roleId = "ROLE_MANAGER";
      break;
    case "Designer":
      roleId = "ROLE_DESIGNER";
      break;
    case "Sales":
      roleId = "ROLE_SALES";
      break;
    case "Technician":
      roleId = "ROLE_TECHNICIAN";
      break;
    default:
      roleId = 0; // Không có quyền
  }
  
  if (!allowedRoles.includes(roleId)) {
    console.log(`Access denied: User role ${role} (${roleId}) not in allowed roles ${allowedRoles}`);
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppContent = () => {
  const location = useLocation();  // Lấy đường dẫn hiện tại
  const hideHeaderFooter = false;

  return (
    <>
      {!hideHeaderFooter && <Header />}

      
      {/* Chỉ hiển thị Carousel khi ở trang chủ (/) */}
      {/* {location.pathname === '/' && <NewProductCarousel />} */}
      <main className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/design/custom" element={<DesignerPage/>} />
          <Route path="/design/mau-co-san" element={<DesignSamples/>}/>
          <Route path="/design/bang-gia-dong-phuc" element={<PricingTable />} />
          <Route path="/design/bang-gia-ao-lop" element={<PricingClass />} />
          {/* <Route path="/design/bang-gia-phu-kien" element={<PricingAccessory />} /> */}
          <Route path="/design/bang-gia-dich-vu" element={<PricingService />} />
          {/* <Route path="/blog" element={<InfoPage />} />
          <Route path="/blog/:id" element={<ArticleDetail />} />
          <Route path="/blog/class" element={<NewsPage />} />
          <Route path="/blog/class/:id" element={<NewsDetail />} />
          <Route path="/blog/b" element={<HandPage />} />
          <Route path="/blog/b/:id" element={<HandDetail />} />
          <Route path="/blog/b/:id" element={<HandDetail />} /> */}
          <Route path="/change-password" element={<ChangePassword />} />
          {/* <Route path="/order-detail" element={<OrderDetail />} /> */}

          {/* Protected routes for Admin (roleId = "ROLE_ADMIN") */}
          <Route path="/Admin" element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><AdminPage /></ProtectedRoute>} />
          <Route path="/order-tracking/" element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><OrderTracking /></ProtectedRoute>} />
          <Route path="/order-detail/:orderId" element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><OrderDetail /></ProtectedRoute>} />
          <Route path="/store/" element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><StoreListPage /></ProtectedRoute>} />
          {/* <Route path="/member" element={<ProtectedRoute allowedRoles={[2]}><MemberPage /></ProtectedRoute>} /> */}
           {/* <Route path="/order-tracking/:orderId" element={<ProtectedRoute allowedRoles={[2]}><OrderTracking /></ProtectedRoute>} /> */}

           <Route path="/member" element={<ProtectedRoute allowedRoles={[2, 3]}><MemberPage /></ProtectedRoute>} />

          {/* Protected routes for Member (roleId = 3) */}
          {/* <Route path="/member" element={<ProtectedRoute allowedRoles={[3]}><MemberPage /></ProtectedRoute>} /> */}
          <Route path="/cart" element={<ProtectedRoute allowedRoles={[3]}><Cart /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute allowedRoles={[3]}><ProductDetail /></ProtectedRoute>} />
          {/* <Route path="/design/custom" element={<ProtectedRoute allowedRoles={[3]}><DesignerPage /></ProtectedRoute>} />
          <Route path="/design/mau-co-san" element={<ProtectedRoute allowedRoles={[3]}><DesignSamples /></ProtectedRoute>} /> */}
          <Route path="/checkout" element={<ProtectedRoute allowedRoles={[3]}><Checkout /></ProtectedRoute>} />
          <Route path="/checkout-confirmation" element={<ProtectedRoute allowedRoles={[3]}><CheckoutConfirmation /></ProtectedRoute>} />
          <Route path="/order-status" element={<ProtectedRoute allowedRoles={[3]}><OrderStatus /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={[3]}><ProfilePage /></ProtectedRoute>} />
          <Route path="/payment-callback" element={<PaymentCallback />} />
          <Route path="/payment-success" element={<CheckPaymentSuccess />} />
          <Route path="/payment-failed" element={<CheckPaymentFailed />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <Router>
      <AppContent />
    </Router>
  </Provider>
);

export default App;


