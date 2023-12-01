import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import "./AdminHeader.css";
import Cart from "../Cart/Cart";

export default function AdminHeader() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary header">
      <Container fluid>
        <Navbar.Brand href="#">
          Shopping Website ADmin Control Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="#action2"
              style={{ marginTop: "5px" }}
              onClick={() => navigate("/admin/")}
            >
              Products
            </Nav.Link>
            <Nav.Link
              href="#1"
              style={{ marginTop: "5px" }}
              onClick={() => navigate("/admin/orders")}
            >
              Orders
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
