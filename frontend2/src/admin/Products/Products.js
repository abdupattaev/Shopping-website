import React, { useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  InputGroup,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  addProduct,
  updateProduct as updateProductService,
  deleteProduct,
} from "../../services/productService";

export default function Products() {
  const [showAdd, setShowAdd] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [popUpMessage, setPopUpMessage] = React.useState("");
  const dispatch = useDispatch();
  const getAllProducts = () => {
    getProducts()
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "UPDATE_PRODUCT_LIST", payload: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    dispatch({ type: "SET_ADMIN", payload: true });
    getAllProducts();
    console.log("get products");
  }, []);
  const product = useSelector((state) => state.productList);
  const [newProduct, setNewProduct] = React.useState({});
  const [updateProduct, setUpdateProduct] = React.useState({});
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleShowUpdate = (item) => {
    console.log(item);
    setShowUpdate(true);
    setUpdateProduct(item);
  };

  const handleAdd = () => {
    addProduct(newProduct)
      .then((res) => {
        console.log(res.data);
        getAllProducts();
        setShowAdd(false);
        setShow(true);
        setPopUpMessage("Product added successfully!");
        setTimeout(() => {
          setShow(false);
        }, 2000);
        setNewProduct({}); // clear the form
      })
      .catch((err) => {
        console.log("the error is: ", err);
        setShowAdd(false);
        setShow(true);
        setPopUpMessage("Something wrong! Try later!");
        setTimeout(() => {
          setShow(false);
        }, 2000);
      });
  };

  const handleUpdate = () => {
    updateProductService(updateProduct.number, updateProduct)
      .then((res) => {
        console.log(res.data);
        getAllProducts();
        setShowUpdate(false);
        setShow(true);
        setPopUpMessage("Product updated successfully!");
        setTimeout(() => {
          setShow(false);
        }, 2000);
        setUpdateProduct({}); // clear the form
      })
      .catch((err) => {
        console.log("the error is: ", err);
        setShowUpdate(false);
        setShow(true);
        setPopUpMessage("Something wrong! Try later!");
        setTimeout(() => {
          setShow(false);
        }, 2000);
      });
  };

  const handleDelete = (number) => {
    deleteProduct(number)
      .then((res) => {
        console.log(res.data);
        getAllProducts();
        setShow(true);
        setPopUpMessage("Product deleted successfully!");
        setTimeout(() => {
          setShow(false);
        }, 2000);
      })
      .catch((err) => {
        console.log("the error is: ", err);
        setShow(true);
        setPopUpMessage("Something wrong! Try later!");
        setTimeout(() => {
          setShow(false);
        }, 2000);
      });
  };

  return (
    <div>
      <Container>
        <div
          className="cart-total"
          style={{ border: "0px", paddingBottom: "0px" }}
        >
          <h3>Product list</h3>
          <Button variant="success" onClick={() => setShowAdd(true)}>
            Add New Product +
          </Button>
        </div>

        <Row>
          <Col xs={12} md={12}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Number</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quant in Stock</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {product.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.number}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price} $</td>
                    <td>{item.quantity}</td>
                    <td>
                      <center>
                        <img
                          src="./assets/edit.png"
                          style={{
                            width: "25px",
                            height: "25px",
                            cursor: "pointer",
                            marginLeft: "10px",
                          }}
                          onClick={() => handleShowUpdate(item)}
                        />
                        <img
                          src="./assets/bin.png"
                          style={{
                            width: "25px",
                            height: "25px",
                            cursor: "pointer",
                            marginLeft: "10px",
                          }}
                          onClick={() => handleDelete(item.number)}
                        />
                      </center>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* <======================= add new product =========================> */}
      <Modal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
              Product No:
            </InputGroup.Text>
            <Form.Control
              placeholder="product number"
              name="number"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
              Product Name:
            </InputGroup.Text>
            <Form.Control
              placeholder="product name"
              name="name"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
              Description:
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              placeholder="product description"
              name="description"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
              Product Price:
            </InputGroup.Text>
            <Form.Control
              placeholder="product price"
              name="price"
              type="number"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
              Product Quant:
            </InputGroup.Text>
            <Form.Control
              placeholder="product quantity"
              name="quantity"
              type="number"
              onChange={handleChange}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <======================= update product =========================> */}
      <Modal
        show={showUpdate}
        onHide={() => setShowUpdate(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
              Product No:
            </InputGroup.Text>
            <Form.Control
              placeholder="product number"
              name="number"
              type="number"
              defaultValue={updateProduct?.number}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
              Product Name:
            </InputGroup.Text>
            <Form.Control
              placeholder="product name"
              name="name"
              defaultValue={updateProduct?.name}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
              Description:
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              placeholder="product description"
              name="description"
              defaultValue={updateProduct?.description}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
              Product Price:
            </InputGroup.Text>
            <Form.Control
              placeholder="product price"
              name="price"
              type="number"
              defaultValue={updateProduct?.price}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ width: "120px" }}>
              Product Quant:
            </InputGroup.Text>
            <Form.Control
              placeholder="product quantity"
              name="quantity"
              type="number"
              defaultValue={updateProduct?.quantity}
              onChange={handleChange}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdate(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

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
