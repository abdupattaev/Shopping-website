package com.example.demo.domain;

import java.time.LocalDate;

public class PaymentInfo {
    private String cardNumber;
    private String type;
    private LocalDate expirationDate;
    private String code;

    public PaymentInfo() {
    }

    public PaymentInfo(String cardNumber, String type, LocalDate expirationDate, String code) {
        this.cardNumber = cardNumber;
        this.type = type;
        this.expirationDate = expirationDate;
        this.code = code;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getType() {
        return type;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public String getCode() {
        return code;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        String result = "PaymentInfo{" +
                "cardNumber='" + cardNumber + '\'' +
                ", type='" + type + '\'' +
                ", expirationDate=" + expirationDate +
                ", code='" + code + '\'' +
                '}';
        return result;

    }
}
