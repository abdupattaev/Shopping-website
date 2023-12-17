package com.example.demo.controllers;

import java.util.*;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ProductDto;
import com.example.demo.dto.ReviewDto;
import com.example.demo.services.ProductService;

import jakarta.validation.Valid;

@RequestMapping("api/v1/products")
@RestController
@CrossOrigin(origins = "*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("")
    public ResponseEntity<?> addProduct(@Valid @RequestBody ProductDto productDto) {

        System.out.println("ipwkcv,mrt4e" + productDto);
        ProductDto newProduct = productService.addProduct(productDto);
        Map<String, Object> response = new HashMap();
        response.put("success", true);
        response.put("message", "Product added successfully");
        response.put("status", Response.SC_OK);
        response.put("data", newProduct);

        return new ResponseEntity<Map>(response, HttpStatus.OK);

    }

    @GetMapping("")
    public ResponseEntity<?> getProducts() {
        List<ProductDto> products = productService.getProducts();
        Map<String, Object> response = new HashMap();
        response.put("success", true);
        response.put("message", "Products fetched successfully");
        response.put("status", Response.SC_OK);
        response.put("data", products);
        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }

//    @PostMapping("/{productNumber}")
//    public ResponseEntity<?> addReview(@RequestBody ReviewDto reviewDto, @PathVariable int productNumber) {
//
//        ReviewDto newReview = productService.addReviewToProduct(productNumber, reviewDto);
//        Map<String, Object> response = new HashMap();
//        response.put("success", true);
//        response.put("message", "Review added successfully");
//        response.put("status", Response.SC_OK);
//        response.put("data", newReview);
//
//        return new ResponseEntity<Map>(response, HttpStatus.OK);
//
//    }

    @PostMapping("/{productNumber}")
    public ResponseEntity<?> addReview(@Valid @RequestBody ReviewDto reviewDto, @PathVariable Integer productNumber) {
        ReviewDto newReview = productService.addReviewToProduct(productNumber, reviewDto);
        Map<String, Object> response = new HashMap();
        response.put("success", true);
        response.put("message", "Review added successfully");
        response.put("status", Response.SC_OK);
        response.put("data", newReview);

        return new ResponseEntity<Map>(response, HttpStatus.OK);

    }

    @PutMapping("/{productNumber}")
    public ResponseEntity<?> updateProduct(@Valid @RequestBody ProductDto productDto) {
        ProductDto newProduct = productService.updateProduct(productDto, productDto.number());
        Map<String, Object> response = new HashMap();
        response.put("success", true);
        response.put("message", "Product added successfully");
        response.put("status", Response.SC_OK);
        response.put("data", newProduct);

        return new ResponseEntity<Map>(response, HttpStatus.OK);

    }

    @DeleteMapping("/delete/{productNumber}")
    public ResponseEntity<?> deleteProduct(@PathVariable int productNumber) {
        productService.removeProduct(productNumber);
        Map<String, Object> response = new HashMap();
        response.put("success", true);
        response.put("message", "Product deleted successfully");
        response.put("status", Response.SC_OK);
        response.put("data", null);

        return new ResponseEntity<Map>(response, HttpStatus.OK);

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
        System.out.println("******************************************");
        System.out.println(ex.getBindingResult().getFieldErrors());
        Map<String, Object> fieldError = new HashMap<>();
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        for (FieldError error : fieldErrors) {
            fieldError.put(error.getField(), error.getDefaultMessage());
        }

        Map<String, Object> map = new HashMap<>();
        map.put("Success", false);
        map.put("data", null);
        map.put("status", HttpStatus.BAD_REQUEST);
        map.put("message", "Validation error");
        map.put("fieldError", fieldError);
        return new ResponseEntity<Object>(map, HttpStatus.BAD_REQUEST);
    }
}
