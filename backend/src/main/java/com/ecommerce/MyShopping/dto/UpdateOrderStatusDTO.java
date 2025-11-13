package com.ecommerce.MyShopping.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateOrderStatusDTO {
    private String status; // eg. "SHIPPED", "DELIVERED", etc.
}
