import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Form,
  Button,
} from "react-bootstrap";
import "./Header.css";
import Cart from "../Cart/Cart";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cart).length;

  const handleShow = () => {
    console.log("clicked");
    dispatch({
      type: "SHOW_CART",
      payload: true,
    });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary header">
      <Container fluid>
        <Navbar.Brand href="#">Shopping Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="#1"
              style={{ marginTop: "5px" }}
              onClick={() => navigate("/")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#action2"
              style={{ marginTop: "5px" }}
              onClick={() => navigate("/my-orders")}
            >
              My-orders
            </Nav.Link>
            <Nav.Link
              href="#action2"
              className="header-cart-container"
              onClick={() => navigate("/cart")}
            >
              <span style={{ marginTop: "-15px" }}>Cart</span>
              <img src="./assets/trolley.png" className="header-cart" />
              <span className="cart-count">{count}</span>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
      <Cart />
    </Navbar>
  );
}
