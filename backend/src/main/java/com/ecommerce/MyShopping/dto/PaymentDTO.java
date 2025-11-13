package com.ecommerce.MyShopping.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
    private Long id;
    private Long orderId;
    private String paymentMethod; // e.g., "CREDIT_CARD", "PAYPAL"
    private String status; // e.g., "PENDING", "COMPLETED", "
    private String createdAt; // ISO 8601 format for date-time
    private String paymentIntentId; // Unique identifier for the payment intent
}
