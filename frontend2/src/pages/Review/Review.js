import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Review.css";

export default function Review() {
  const location = useLocation();
  const dispatch = useDispatch();
  const addToCar = (e) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: location.state.number,
        name: location.name,
        price: location.price,
        quantity: 1,
        description: location.description,
      },
    });
  };

  React.useEffect(() => {
    console.log(location.state);
  }, []);
  return (
    <div>
      <Container>
        <Row>
          <h3>Review</h3>
          <hr />
          <Col xs={12} md={4}>
            <img src="./assets/product.webp" className="review-img" />
          </Col>
          <Col xs={12} md={8}>
            <table>
              <tr>
                <td style={{ fontWeight: "bold" }}>Product Number</td>
                <td>{location.state?.number}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>Product Name</td>
                <td>{location.name}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>Product Price</td>
                <td>{location.price}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>Product Description</td>
                <td>{location.description}</td>
              </tr>
              <tr>
                <Button
                  variant="success"
                  style={{ padding: "2px 30px", marginTop: "20px" }}
                  onClick={addToCar}
                >
                  Add to cart
                </Button>
              </tr>
            </table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
