package com.example.demo.dto;

public record OrderItemDto(
        Integer productId,
        String name,
        Double price,
        Integer quantity,
        String description

) {

}
