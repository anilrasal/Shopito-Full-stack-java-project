package com.ecommerce.MyShopping.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.MyShopping.dto.ProductDTO;
import com.ecommerce.MyShopping.mapper.ProductMapper;
import com.ecommerce.MyShopping.model.Product;
import com.ecommerce.MyShopping.repository.ProductRepository;
import com.ecommerce.MyShopping.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Page<ProductDTO> findAll(Pageable pageable) {
        return productRepository.findAll(pageable).map((ProductMapper::toProductDTO));
    }

    @Override
    public void updateStock(Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));
        // Calculate the updated stock
        // Ensure that the stock does not go negative
        int updatedStock = product.getInventory() - quantity;

        if (updatedStock < 0) {
            throw new IllegalArgumentException("Insufficient stock for product ID: " + productId);
        }
        product.setInventory(updatedStock);
        productRepository.save(product);

    }

    @Override
    public List<ProductDTO> searchProducts(String query) {
        List<Product> matched = productRepository
                .findByNameOrDescription(query);

        return matched.stream()
                .map(ProductMapper::toProductDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<ProductDTO> findByCategory(String category, Pageable pageable) {
        return productRepository.findByCategoryContainingIgnoreCase(category, pageable)
                .map(ProductMapper::toProductDTO);
    }

}
