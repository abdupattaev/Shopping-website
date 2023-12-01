package com.example.demo.domain;

public class User {
    private String name;
    private String email;
    private String phone;
    private String city;
    private String street;
    private String zip;

    public User() {

    }

    public User(String name, String email, String phone, String city, String street, String zip) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.street = street;
        this.zip = zip;

    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getCity() {
        return city;
    }

    public String getStreet() {
        return street;
    }

    public String getZip() {
        return zip;
    }

    public void setName(String name) {
        this.name = name;

    }

    public void setEmail(String email) {
        this.email = email;

    }

    public void setPhone(String phone) {
        this.phone = phone;

    }

    public void setCity(String city) {
        this.city = city;

    }

    public void setStreet(String street) {
        this.street = street;

    }

    public void setZip(String zip) {
        this.zip = zip;

    }

    @Override
    public String toString() {
        return "User [name=" + name + ", email=" + email + ", phone=" + phone + ", city=" + city + ", street=" + street
                + ", zip=" + zip + "]";
    }

}
