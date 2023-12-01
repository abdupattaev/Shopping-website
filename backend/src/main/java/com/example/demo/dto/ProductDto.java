package com.example.demo.dto;

import java.util.List;

public record ProductDto(
                Integer number,
                String name,
                String description,
                double price,
                int quantity,
                List<ReviewDto> reviews) {
}
