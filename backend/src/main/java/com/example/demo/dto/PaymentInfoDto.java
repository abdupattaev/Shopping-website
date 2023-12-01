package com.example.demo.dto;

import java.time.LocalDate;

public record PaymentInfoDto(
        String cardNumber,
        String type,
        LocalDate expirationDate,
        String code) {

}
