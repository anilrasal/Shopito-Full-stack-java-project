package com.ecommerce.MyShopping.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDTO {
    private Long orderId;
    private Long userId;
    private LocalDateTime orderDate;
    private String status; // e.g., "PENDING", "SHIPPED", "DELIVERED"
    private List<OrderItemDTO> orderItems;

}
