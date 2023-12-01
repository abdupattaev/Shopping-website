import axios from "axios";
const API_ERL = "http://localhost:8080/api/v1/orders";

const getOrders = () => {
  return axios.get(API_ERL);
};

const addOrder = (order) => {
  return axios.post(API_ERL, order);
};

const updateOrderStatus = (id, status) => {
  return axios.put(`${API_ERL}/${id}/?status=${status}`);
};

export { getOrders, addOrder, updateOrderStatus };
