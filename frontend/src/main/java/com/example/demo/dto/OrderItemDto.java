package com.example.demo.dto;

public record OrderItemDto(
        String productId,
        String name,
        Double price,
        Integer quantity,
        String description

) {

}
