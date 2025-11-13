package com.ecommerce.MyShopping.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ecommerce.MyShopping.dto.ProductDTO;
import com.ecommerce.MyShopping.model.Product;

public interface ProductService {
    Product save(Product product);

    Optional<Product> findById(Long id);

    void deleteById(Long id);

    Page<ProductDTO> findAll(Pageable pageable);

    void updateStock(Long productId, int quantity);

    List<ProductDTO> searchProducts(String query);

    Page<ProductDTO> findByCategory(String category, Pageable pageable);
}
