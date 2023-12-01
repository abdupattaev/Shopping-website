package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.domain.Product;
import com.example.demo.dto.ProductDto;

public interface ProductRepository extends MongoRepository<Product, Integer> {
    public void deleteByNumber(Integer productNumber);
    public Product findByNumber(Integer productNumber);



}
