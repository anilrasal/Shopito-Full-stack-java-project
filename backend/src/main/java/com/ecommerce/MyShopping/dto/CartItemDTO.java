package com.ecommerce.MyShopping.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    private Long id; // Unique identifier for the cart item
    private Integer quantity;
    // private Long userId;// ID of the user who owns the cart item
    private Long productId;
    private ProductDTO productDTO; // Product details associated with the cart item

}
