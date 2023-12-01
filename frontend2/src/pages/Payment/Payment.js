import React, { useState } from "react";
import { Col, Container, Row, Button, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/Cart/CartItem/CartItem";

export default function Payment() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [payment, setPayment] = useState({});

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    payment.expriationDate = payment.expirationDate.replace(/\//g, "-");
    dispatch({ type: "ADD_PAYMENT", payload: payment });
    navigate("/check-place");
  };
  return (
    <div>
      <Container>
        <h3>Checkout: Payment Information</h3>
        <hr />
        <Row>
          <Col xs={12} md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
                Cart Number:
              </InputGroup.Text>
              <Form.Control
                placeholder="card number"
                type="number"
                name="cardNumber"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
                Payment Type:
              </InputGroup.Text>
              <Form.Select name="type" onChange={handleChange}>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
                Exp. Date:
              </InputGroup.Text>
              <Form.Control
                placeholder="phone"
                type="date"
                name="expirationDate"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
                Code:
              </InputGroup.Text>
              <Form.Control
                placeholder="street"
                type="number"
                name="code"
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
                  navigate("/check");
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
