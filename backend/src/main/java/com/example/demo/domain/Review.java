package com.example.demo.domain;

public class Review {
    private String name;
    private String review;
    private int rate;

    public Review() {
    }

    public Review(String name, String review, int rate) {
        this.name = name;
        this.review = review;
        this.rate = rate;
    }

    public String getName() {
        return name;
    }

    public String getReview() {
        return review;
    }

    public int getRate() {
        return rate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    @Override
    public String toString() {
        String result = "Review{" +
                "name='" + name + '\'' +
                ", review='" + review + '\'' +
                ", rate=" + rate +
                '}';
        return result;
    }

}
