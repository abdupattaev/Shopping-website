import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProductItem({ name, price, description, number }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCar = (e) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { productId: number, name, price, quantity: 1, description },
    });
  };

  const handleReview = () => {
    navigate("/review", {
      state: {
        name: name,
        price: price,
        description: description,
        number: number,
      },
    });
  };
  return (
    <Card style={{ marginTop: "30px" }}>
      <Card.Img variant="top" src="/assets/product.webp" />
      <Card.Body>
        <Card.Title>{`${name}: ${price}$`}</Card.Title>
        <Card.Text>
          {description}
          <div className="product-item-buttons">
            <Button
              className="product-item-button"
              variant="success"
              style={{ padding: "1px", margin: "3px", borderRadius: "10px" }}
              onClick={handleReview}
            >
              open-details
            </Button>
            <img
              src="./assets/cart.png"
              className="product-item-cart"
              style={{
                width: "25px",
                height: "25px",
                margin: "15px",
                cursor: "pointer",
              }}
              alt=""
              value={{ name, price, description, number }}
              onClick={addToCar}
            />
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
