package com.example.demo.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.*;
@Document
public class Product {
  @Id
  private Integer id;
    private Integer number;
    private String name;
    private String description;
    private double price;
    private int quantity;
    private List<Review> reviews;

    public Product() {
        this.reviews = new ArrayList<>();
    }

    public Product(Integer number, String name, String description, double price, int quantity) {
        this.number = number;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.reviews = new ArrayList<>();

    }

    public int getNumber() {
        return number;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void setName(String name) {
        this.name = name;

    }

    public void setDescription(String description) {
        this.description = description;

    }

    public void setPrice(double price) {
        this.price = price;

    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;

    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public void addReview(Review review) {
        this.reviews.add(review);
    }

    @Override
    public String toString() {
        return "Product{" + "number=" + number + ", name='" + name + '\'' + ", description='" + description + '\''
                + ", price=" + price + ", quantity=" + quantity + '}';
    }

}
