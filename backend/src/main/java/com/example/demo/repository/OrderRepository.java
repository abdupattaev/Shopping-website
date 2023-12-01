package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.domain.Order;

public interface OrderRepository extends MongoRepository<Order, String> {
public Order findOrderById(String id);
}
