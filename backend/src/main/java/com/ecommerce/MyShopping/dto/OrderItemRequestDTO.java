package com.ecommerce.MyShopping.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemRequestDTO {

    private int quantity;
    private BigDecimal price;
    private ProductDTO product;
    private Long userId;
    private Long orderId;

}
