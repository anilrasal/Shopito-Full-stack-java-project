package com.ecommerce.MyShopping.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private String category;
    private Integer availableStock;
    private BigDecimal price;
}
