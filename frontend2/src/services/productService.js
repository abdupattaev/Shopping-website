import axios from "axios";
const API_ERL = "http://localhost:8080/api/v1/products";

const getProducts = () => {
  return axios.get(API_ERL);
};

const addProduct = (product) => {
  return axios.post(API_ERL, product);
};

const updateProduct = (productNumber, product) => {
  return axios.put(`${API_ERL}/${productNumber}`, product);
};

const deleteProduct = (productNumber) => {
  return axios.delete(`${API_ERL}/delete/${productNumber}`);
};

export { getProducts, addProduct, updateProduct, deleteProduct };
