import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/Cart/CartItem/CartItem";
import "./Cart.css";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <Row>
          {cartItems.map((item) => {
            return (
              <Col xs={12} md={12}>
                <CartItem {...item} />
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <div className="cart-total">
              <span style={{ fontSize: "bold" }}>
                Total: Rp.{" "}
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </span>
              <Button
                className="cart-checkout"
                style={{ padding: "12px 50px", borderRadius: "30px" }}
                variant="success"
                onClick={() => {
                  navigate("/check");
                }}
              >
                Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
