package com.example.demo.domain;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

public class Order {

    private String id;
    private String status;
    private List<OrderItem> OrderItems;
    private User user;
    private PaymentInfo paymentInfo;

    public Order() {
    }

    public Order(String status,  User user, PaymentInfo paymentInfo,List<OrderItem> OrderItems) {
        this.status = status;
        this.OrderItems = OrderItems;
        this.user = user;
        this.paymentInfo = paymentInfo;
    }

    public String getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public List<OrderItem> getOrderItems() {
        return OrderItems;
    }

    public User getUser() {
        return user;
    }

    public PaymentInfo getPaymentInfo() {
        return paymentInfo;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setOrderItems(List<OrderItem> OrderItems) {
        this.OrderItems = OrderItems;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setPaymentInfo(PaymentInfo paymentInfo) {
        this.paymentInfo = paymentInfo;
    }

    @Override
    public String toString() {
        String result = "Order{" +
                "status='" + status + '\'' +
                ", OrderItems=" + OrderItems +
                ", user=" + user +
                ", paymentInfo=" + paymentInfo +
                '}';
        return result;
    }

}
