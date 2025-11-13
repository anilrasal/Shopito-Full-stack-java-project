package com.ecommerce.MyShopping.mapper;

import com.ecommerce.MyShopping.dto.ProductDTO;
import com.ecommerce.MyShopping.model.Product;

public class ProductMapper {

    public static ProductDTO toProductDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setImageUrl(product.getImageUrl());
        dto.setPrice(product.getPrice());
        dto.setCategory(product.getCategory());
        dto.setAvailableStock(product.getInventory());
        return dto;
    }

    public static Product toProduct(ProductDTO dto) {
        Product product = new Product();
        // id is auto generated for product. Hence, didn't use setID
        product.setCategory(dto.getCategory());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        product.setInventory(dto.getAvailableStock());
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        return product;
    }
}
