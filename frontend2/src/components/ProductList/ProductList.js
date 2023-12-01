import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductItem from "./Product/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../services/productService";

export default function ProductList() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("get products");
    getProducts()
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "UPDATE_PRODUCT_LIST", payload: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const product = useSelector((state) => state.productList);
  console.log(product);
  return (
    <>
      <Container>
        <Row>
          <h3>Enjoy Shopping Experience</h3>
          {product.map((item) => {
            return (
              <Col xs={12} md={2}>
                <ProductItem {...item} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
