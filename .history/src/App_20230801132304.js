/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./E-CommerceAdmin/forms/Login";
import Dashboard from "./E-CommerceAdmin/pages/Dashboard";
import ECategory from "./E-CommerceAdmin/pages/ECategory";
import EVendorList from "./E-CommerceAdmin/pages/EVendorList";
import EAdminProduct from "./E-CommerceAdmin/pages/EAdminProduct";
import EAdminDelivery from "./E-CommerceAdmin/pages/EAdminDelivery";
import EAdminCustomer from "./E-CommerceAdmin/pages/EAdminCustomer";
import EAdmin from "./E-CommerceAdmin/pages/EAdmin";
import ESubCategory from "./E-CommerceAdmin/pages/ESubCategory";
import PushNotification from "./E-CommerceAdmin/pages/PushNotification";
import Banners from "./E-CommerceAdmin/pages/Banners";
import Coupon from "./E-CommerceAdmin/pages/Coupon";
import GetMeThis from "./E-CommerceAdmin/pages/GetMeThis";
import PrivacyPolicy from "./E-CommerceAdmin/pages/PrivacyPolicy";
import Terms from "./E-CommerceAdmin/pages/Terms";
import HelpSupport from "./E-CommerceAdmin/pages/HelpSupport";
import Complaints from "./E-CommerceAdmin/pages/Complaints";
import Order from "./E-CommerceAdmin/pages/Orders/Order";
import SingleOrder from "./E-CommerceAdmin/pages/Orders/SingleOrder";
import Product from "./E-CommerceAdmin/pages/Product/Product";
import CreateProduct from "./E-CommerceAdmin/pages/Product/CreateProduct";
import SingleProduct from "./E-CommerceAdmin/pages/Product/SingleProduct";
import EditProduct from "./E-CommerceAdmin/pages/Product/EditProduct";

function App() {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Category" element={<ECategory />} />
        <Route path="/SubCategory" element={<ESubCategory />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/order/:id" element={<SingleOrder />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      
      </Routes>
    </>
  );
}

export default App;
