import React from "react";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../services/orderService";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const cartItems = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const payment = useSelector((state) => state.paymentInfo);
  const [show, setShow] = React.useState(false);
  const [popUpMessage, setPopUpMessage] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    addOrder({
      status: "placed",
      user,
      paymentInfo: payment,
      orderItems: cartItems,
    })
      .then((res) => {
        setShow(true);
        setPopUpMessage(" Your order has been placed! Thank you!");
        setTimeout(() => {
          setShow(false);
          navigate("/my-orders");
        }, 2000);
        // then clear the cart
        dispatch({ type: "CLEAR_CART" });
      })
      .catch((err) => {
        setShow(true);
        setPopUpMessage(" Something wrong! Try later!");
        setTimeout(() => {
          setShow(false);
        }, 2000);
      });
  };

  const dispatch = useDispatch();
  return (
    <div>
      <Container>
        <Row>
          <h3>Confirmation:</h3>
          <hr />
          <Col xs={12} md={4}>
            <h5>User Information:</h5>
            <table>
              <tr>
                <td style={{ fontWeight: "bold", width: "100px" }}>Name:</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: "100px" }}>Email:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: "100px" }}>Phone:</td>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: "100px" }}>Street:</td>
                <td>{user.street}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: "100px" }}>City:</td>
                <td>{user.city}</td>
              </tr>
            </table>
          </Col>
          <Col xs={12} md={4}>
            <h5>Payment Information:</h5>
            <table>
              <tr>
                <td style={{ fontWeight: "bold", width: "150px" }}>
                  Card Number:
                </td>
                <td>{payment.cardNumber}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: "150px" }}>
                  Exp Date:
                </td>
                <td>{payment.expirationDate}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: "150px" }}>Code:</td>
                <td>{payment.code}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: "150px" }}>
                  Card Type:
                </td>
                <td>{payment.type}</td>
              </tr>
            </table>
          </Col>
          <Col xs={12} md={4}>
            <h5>Cart Items:</h5>
            <table>
              <tr>
                <td style={{ fontWeight: "bold", width: "100px" }}>Name</td>
                <td style={{ fontWeight: "bold", width: "100px" }}>Price</td>
                <td style={{ fontWeight: "bold", width: "100px" }}>Quantity</td>
                <td style={{ fontWeight: "bold", width: "100px" }}>P.Q</td>
              </tr>
              {cartItems.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity * item.price}</td>
                  </tr>
                );
              })}
            </table>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <div className="cart-total">
              <span style={{ fontSize: "bold" }}>
                Total: {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </span>
              <Button
                className="cart-checkout"
                style={{ padding: "8px 50px", borderRadius: "30px" }}
                variant="success"
                onClick={handleSubmit}
              >
                Place My Order
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{popUpMessage}</Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  );
}
