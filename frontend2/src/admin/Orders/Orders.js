import React, { useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  InputGroup,
  Form,
  Modal,
} from "react-bootstrap";
import { getOrders, updateOrderStatus } from "../../services/orderService";

export default function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [popUpMessage, setPopUpMessage] = React.useState("");

  const getAllOrders = () => {
    getOrders()
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("get orders");
    getAllOrders();
  }, []);

  const handleChange = (id, status) => {
    console.log("id", id, "status", status);
    updateOrderStatus(id, status)
      .then((res) => {
        console.log(res.data);
        setPopUpMessage(res.data.message);
        setShow(true);
        getAllOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                    paddingBottom: "10px",
                  }}
                >
                  <span style={{ fontSize: "bold" }}>
                    Order No: {index + 1}
                  </span>
                  <div>
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        id="basic-addon1"
                        style={{ width: "120px" }}
                      >
                        Status:
                      </InputGroup.Text>
                      <Form.Select
                        name="status"
                        onChange={(e) => handleChange(order.id, e.target.value)}
                      >
                        <option value={order.status}>{order.status}</option>
                        <option value="placed">Placed</option>
                        <option value="out for delivery">
                          out for delivery
                        </option>
                        <option value="arrived">arrived</option>
                      </Form.Select>
                    </InputGroup>
                  </div>
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

      {/* <======================= response message =========================> */}
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
