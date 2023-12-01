package com.example.demo.dto;

public record PaymentInfoDto(
        String cardNumber,
        String type,
        String expirationDate,
        String code) {

}
