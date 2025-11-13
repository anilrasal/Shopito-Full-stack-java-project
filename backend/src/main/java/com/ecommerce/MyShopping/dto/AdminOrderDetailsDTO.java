package com.ecommerce.MyShopping.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminOrderDetailsDTO {
    private Long id;
    private String customerName;
    private List<OrderItemDTO> items;
    private String shippingAddress;
    private String paymentMethod;
    private String orderStatus;
}
