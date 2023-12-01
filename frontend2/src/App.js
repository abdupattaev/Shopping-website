import {
  Button,
  Table,
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import Payment from "./pages/Payment/Payment";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Orders from "./pages/Orders/Orders";
import AdminOrders from "./admin/Orders/Orders";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import Products from "./admin/Products/Products";
import Review from "./pages/Review/Review";

function App() {
  const isAdmin = useSelector((state) => state.isAdmin);
  return (
    <div className="App">
      {isAdmin ? <AdminHeader /> : <Header />}

      <br />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/check" element={<CheckOut />} />
        <Route path="/check-payment" element={<Payment />} />
        <Route path="/check-place" element={<PlaceOrder />} />
        <Route path="/my-orders" element={<Orders />} />
        <Route path="/review" element={<Review />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Products />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
      <br />
      {/* <Button variant="success">Success</Button> */}
      <br />
    </div>
  );
}

export default App;
