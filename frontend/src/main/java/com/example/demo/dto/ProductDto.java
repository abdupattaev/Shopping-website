package com.example.demo.dto;

import java.util.List;

public record ProductDto(
        String name,
        String description,
        String price,
        String quantity,
        List<ReviewDto> reviews) {
}
