package com.ecommerce.MyShopping.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

    private Long id;
    private Long userId;
    private BigDecimal totalAmount;
    private String status; // e.g., "PENDING", "SHIPPED", "
    private LocalDateTime createdAt;
    private List<OrderItemDTO> items; // List of order items

}
