package com.example.demo.dto;

import java.util.List;

public record OrderDto(
        String status,
        UserDto user,
        PaymentInfoDto paymentInfo,
        List<OrderItemDto> orderItems

) {

}
