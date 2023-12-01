package com.example.demo.services.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Order;
import com.example.demo.domain.PaymentInfo;
import com.example.demo.domain.User;
import com.example.demo.dto.OrderDto;
import com.example.demo.dto.OrderItemDto;
import com.example.demo.dto.PaymentInfoDto;
import com.example.demo.dto.UserDto;
import com.example.demo.repository.OrderRepository;
import com.example.demo.services.OrderService;
import com.example.demo.domain.OrderItem;
import com.example.demo.domain.PaymentInfo;
import com.example.demo.domain.User;
import com.example.demo.domain.Product;
import com.example.demo.repository.ProductRepository;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<OrderDto> getOrders() {
        List<Order> orders = orderRepository.findAll();
        List<OrderDto> orderDtos = new ArrayList<>();

        orders.forEach(order -> {
            List<OrderItemDto> orderItemDtos = new ArrayList<>();

            order.getOrderItems().forEach(orderItem -> {
                OrderItemDto orderItemDto = new OrderItemDto(
                        orderItem.getProductId(),
                        orderItem.getName(),
                        orderItem.getPrice(),
                        orderItem.getQuantity(),
                        orderItem.getDescription());
                orderItemDtos.add(orderItemDto);
            });
            UserDto userDto = new UserDto(
                    order.getUser().getName(),
                    order.getUser().getEmail(),
                    order.getUser().getPhone(),
                    order.getUser().getCity(),
                    order.getUser().getStreet(),
                    order.getUser().getZip());
            PaymentInfoDto paymentInfoDto = new PaymentInfoDto(
                    order.getPaymentInfo().getCardNumber(),
                    order.getPaymentInfo().getType(),
                    order.getPaymentInfo().getExpirationDate(),
                    order.getPaymentInfo().getCode());

            OrderDto orderDto = new OrderDto(
                    order.getId(),
                    order.getStatus(),
                    userDto,
                    paymentInfoDto,
                    orderItemDtos);

            orderDtos.add(orderDto);
        });

        return orderDtos;
    }

    @Override
    public void updateOrderStatus(String status, String orderId) {
        Order order = orderRepository.findOrderById(orderId);
        if (order != null) {
            order.setStatus(status);
            orderRepository.save(order);

        } else {
            throw new RuntimeException("Order not found");
        }

    }

    @Override
    public void checkoutOrder(OrderDto orderDto) {

        // create user object
        User newUser = new User(
                orderDto.user().name(),
                orderDto.user().email(),
                orderDto.user().phone(),
                orderDto.user().city(),
                orderDto.user().street(),
                orderDto.user().zip());
        // convert paymentInfoDto to paymentInfo
        PaymentInfo newPaymentInfo = new PaymentInfo(
                orderDto.paymentInfo().cardNumber(),
                orderDto.paymentInfo().type(),
                orderDto.paymentInfo().expirationDate(),
                orderDto.paymentInfo().code());
        // convert orderItemDto to orderItem
        List<OrderItem> newOrderItems = new ArrayList<>();
        for (OrderItemDto orderItemDto : orderDto.orderItems()) {
            OrderItem newOrderItem = new OrderItem(
                    orderItemDto.productId(),
                    orderItemDto.name(),
                    orderItemDto.price(),
                    orderItemDto.description(),
                    orderItemDto.quantity()

            );
            newOrderItems.add(newOrderItem);
        }
        // convert orderDto to order
        Order order = new Order(
                orderDto.status(),
                newUser,
                newPaymentInfo,
                newOrderItems);

        // save order into database
        orderRepository.save(order);
        // update product quantity in database
        for (OrderItemDto orderItemDto : orderDto.orderItems()) {
            Product product = productRepository.findById(orderItemDto.productId()).orElse(null);
            if (product != null) {
                product.setQuantity(product.getQuantity() - orderItemDto.quantity());
                productRepository.save(product);
            }
        }

    }

}
