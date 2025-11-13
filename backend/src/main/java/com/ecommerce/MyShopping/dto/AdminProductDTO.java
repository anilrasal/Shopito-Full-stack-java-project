package com.ecommerce.MyShopping.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductDTO {
    private Long id;
    private String name;
    private BigDecimal price;
    private int stock;
    private String category;
    private boolean active;
}
