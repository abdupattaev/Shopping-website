package com.example.demo.services;

import java.util.*;

import com.example.demo.dto.OrderDto;

import com.example.demo.domain.Order;

public interface OrderService {

    public List<OrderDto> getOrders();

    public void updateOrderStatus(String status, String orderId);

    public void checkoutOrder(OrderDto orderDto);

    //public OrderDto findById(String orderId);

}
