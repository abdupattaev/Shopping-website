import React from "react";
import { Button, Modal, Nav, Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";

export default function PopUpMessage() {
  const dispatch = useDispatch();
  const handleClose = () =>
    dispatch({
      type: "SHOW_CART",
      payload: false,
    });

  const show = useSelector((state) => state.showCart);
  const cartItems = useSelector((state) => state.cart);

  return (
    <div style={{ float: "right", backgroundColor: "red", padding: "8px" }}>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>

        {cartItems.map((item) => {
          <Navbar bg="primary" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
            </Container>
          </Navbar>;
        })}
        <cartItem />

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
