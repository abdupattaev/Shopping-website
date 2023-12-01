package com.example.demo.services.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Product;
import com.example.demo.domain.Review;
import com.example.demo.dto.ProductDto;
import com.example.demo.dto.ReviewDto;
import com.example.demo.repository.ProductRepository;
import com.example.demo.services.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ProductDto addProduct(ProductDto productDto) {
        Product product = new Product(
                productDto.number(),
                productDto.name(),
                productDto.description(),
                productDto.price(),
                productDto.quantity());
        productRepository.save(product);
        return productDto;

    }

    @Override
    public void removeProduct(int productId) {
        productRepository.deleteByNumber(productId);

    }

    @Override
    public ProductDto updateProduct(ProductDto productDto, Integer productNumber) {
        Product product = productRepository.findByNumber(productNumber);
       // System.out.println("product687" + product);
        if (product != null) {
            List<Review> reviews = new ArrayList<>();
            if (productDto.reviews() != null) {
            productDto.reviews().forEach(review -> {
                reviews.add(new Review(
                        review.name(),
                        review.review(),
                        review.rate()

                ));
            });
        }
            product = new Product(
                    productDto.number(),
                    productDto.name(),
                    productDto.description(),
                    productDto.price(),
                    productDto.quantity()

            );
            product.setReviews(reviews);
            productRepository.save(product);

        }
        return productDto;
    }

    @Override
    public List<ProductDto> getProducts() {
        // get all products from database
        List<Product> products = productRepository.findAll();
        // create a list of productDtos then convert each product to productDto
        List<ProductDto> productDtos = new ArrayList<>();
        products.forEach(product -> {
            // create a list of reviewDtos then convert each review to reviewDto
            List<ReviewDto> reviewDtos = new ArrayList<>();
            product.getReviews().forEach(review -> {
                ReviewDto innerReview = new ReviewDto(
                        review.getName(),
                        review.getReview(),
                        review.getRate());
                reviewDtos.add(innerReview);
            });

            // convert product to productDto
            productDtos.add(new ProductDto(
                    product.getNumber(),
                    product.getName(),
                    product.getDescription(),
                    product.getPrice(),
                    product.getQuantity(),
                    reviewDtos));
        });

        return productDtos;

    }

    @Override
    public ReviewDto addReviewToProduct(Integer productNumber, ReviewDto reviewDto) {
         System.out.println("product678"  +productNumber+reviewDto);
        Product product = productRepository.findByNumber(productNumber);
       
        if (product != null) {

            product.addReview(new Review(
                    reviewDto.name(),
                    reviewDto.review(),
                    reviewDto.rate()));
            productRepository.save(product);
            System.out.println("productafter" + product);
        }
        return reviewDto;
    }

}
