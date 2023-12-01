import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getOrders } from "../../services/orderService";

export default function Orders() {
  const [orders, setOrders] = React.useState([]);

  useEffect(() => {
    console.log("get orders");
    getOrders()
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Container>
        <h3>My Orders</h3>
        <Row>
          <Col xs={12} md={12}>
            {orders.map((order, index) => (
              <div key={index + 1}>
                <div
                  className="cart-total"
                  style={{
                    borderTop: "0px",
                    marginBottom: "5px",
                    paddingBottom: "0px",
                  }}
                >
                  <span style={{ fontSize: "bold" }}>
                    Order No: {index + 1}
                  </span>
                  <span style={{ fontSize: "bold" }}>
                    Status No: {order.status}
                  </span>
                  <span style={{ fontSize: "bold" }}>
                    Total price for order:{" "}
                    {order.orderItems.reduce(
                      (a, c) => a + c.price * c.quantity,
                      0
                    )}
                    $
                  </span>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Item Number</th>
                      <th>Item Name</th>
                      <th>Description </th>
                      <th>Quant</th>
                      <th>Price/Unit</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((order) => (
                      <tr>
                        <td>{order.productId}</td>
                        <td>{order.name}</td>
                        <td>{order.description}</td>
                        <td>{order.quantity}</td>
                        <td>{order.price} $</td>
                        <td>{order.price * order.quantity} $</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <br />
                <br />
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
