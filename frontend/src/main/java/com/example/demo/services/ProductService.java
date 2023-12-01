package com.example.demo.services;

import java.util.List;

import com.example.demo.dto.ProductDto;
import com.example.demo.dto.ReviewDto;

public interface ProductService {
    public ProductDto addProduct(ProductDto productDto);

    public void removeProduct(int productId);

    public ProductDto updateProduct(ProductDto productDto, int productId);

    public List<ProductDto> getProducts();

    public ReviewDto addReviewToProduct(int productId, ReviewDto reviewDto);

}
