import React, { useState } from "react";
import { Col, Container, Row, Button, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/Cart/CartItem/CartItem";
import "./CheckOut.css";

export default function CheckOut() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch({ type: "ADD_USER", payload: user });
    navigate("/check-payment");
  };

  return (
    <div>
      <Container>
        <h3>Checkout: User Information</h3>
        <hr />
        <Row>
          <Col xs={12} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
                User Name:
              </InputGroup.Text>
              <Form.Control
                placeholder="name"
                name="name"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
                User Email:
              </InputGroup.Text>
              <Form.Control
                placeholder="email"
                name="email"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
                User Phone:
              </InputGroup.Text>
              <Form.Control
                placeholder="phone"
                name="phone"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
                Street:
              </InputGroup.Text>
              <Form.Control
                placeholder="street"
                name="street"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
                City:
              </InputGroup.Text>
              <Form.Control
                placeholder="city"
                name="city"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
                ZIP:
              </InputGroup.Text>
              <Form.Control
                placeholder="zip code"
                name="zip"
                onChange={handleChange}
              />
            </InputGroup>
            <div className="next-back-button">
              <Button
                style={{
                  width: "28%",
                  borderRadius: "15px",
                }}
                variant="success"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Back
              </Button>
              <Button
                style={{
                  width: "70%",
                  borderRadius: "15px",
                }}
                variant="success"
                onClick={handleSubmit}
              >
                Next
              </Button>
            </div>
          </Col>

          <Col xs={12} md={8}>
            <h5>Cart Items</h5>
            {cartItems.map((item) => {
              return (
                <Col xs={12} md={12}>
                  <CartItem {...item} />
                </Col>
              );
            })}
            <div className="cart-total">
              <span style={{ fontSize: "bold" }}>
                Total: Rp.{" "}
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
