import { useLocation, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import Navbar from './Components/Navbar/Navbar';

import Home from './user/Home';
import ProductActions from './admin/product';
import Dashboard from './admin/dashboard';
  
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
            <Route path="/" element={<Home />} />
            <Route path="/admin/products" element={<ProductActions />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
  )
}

export default App;
