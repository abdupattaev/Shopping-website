package com.example.demo.services;

import java.util.*;

import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;

public interface OrderService {

    public List<OrderDto> getOrders();

    public OrderDto updateOrderStatus(String status, int orderId);

    public void checkoutOrder(OrderDto orderDto);

}
