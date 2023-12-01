import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./CartItem.css";

export default function CartItem({
  productId,
  name,
  price,
  description,
  quantity,
}) {
  const dispatch = useDispatch();
  const handleMinus = () => {
    if (quantity === 1) handleRemove();
    else
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { productId: productId, value: quantity - 1 },
      });
  };
  const handlePlus = () => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId: productId, value: quantity + 1 },
    });
  };
  const handleRemove = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
  };
  return (
    <>
      <div className="cart-item">
        <img className="cart-item-image" src="./assets/product.webp" alt="" />

        <div className="cart-item-info">
          <div className="cart-item-name">Product Name: {name}</div>
          <div className="cart-item-price">Rp: {price * quantity}</div>
          <div className="cart-item-qty">Qty: {quantity}</div>
        </div>
        <div className="cart-item-action">
          <img
            className="cart-item-icon"
            src="./assets/minus.png"
            alt=""
            onClick={handleMinus}
          />
          <span className="cart-item-quantity">{quantity}</span>
          <img
            className="cart-item-icon"
            src="./assets/plus.png"
            alt=""
            onClick={handlePlus}
          />
          <Button
            className="cart-item-remove"
            style={{ padding: "2px 7px", borderRadius: "15px" }}
            variant="success"
            onClick={handleRemove}
          >
            Remove
          </Button>
        </div>
      </div>
    </>
  );
}
