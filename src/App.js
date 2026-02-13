import { useLocation, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import Navbar from './Components/Navbar/Navbar';

import Home from './user/Home';
import AdminLogin from './admin/login';
import ProductActions from './admin/product';
import Dashboard from './admin/dashboard';
import UserForm from './user/UserForm';
import DashboardUser from './user/dashboard';
import Footer from './Components/Navbar/Footer';
import OrderDetail from './cart/OrderDetail';
import AboutUs from './Components/Navbar/aboutus';
import CorporateProfile from './Components/Navbar/corporateprofile';

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.toLowerCase().includes('admin');
  
  return (
      <div className='container'>
        <ToastContainer position="top-right" autoClose={5000} />
        <Navbar isAdmin={isAdmin} />
        <div className="content-area">
          <Routes>
            <Route path="/:cat/:catid/:sub/:subid" element={<Home />} />
            <Route path="/:cat/:catid" element={<Home />} />
            <Route path="/:catname" element={<Home />} />
            <Route path="/" element={<DashboardUser />} />
            <Route path="/signup" element={<UserForm />} />
            <Route path="/reset" element={<UserForm />} />
            <Route path="/admin/products" element={<ProductActions />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/contact" element={<UserForm />} />
            <Route path="/orderdetail" element={<OrderDetail />} />
            <Route path="/login" element={<UserForm />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/corporateprofile" element={<CorporateProfile />} />
          </Routes>
        </div>
      <footer className="site-footer">
        <Footer />
      </footer>
      </div>
  )
}

export default App;
