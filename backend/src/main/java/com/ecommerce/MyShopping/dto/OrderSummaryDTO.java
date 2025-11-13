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
public class OrderSummaryDTO {

    private String invoiceNumber;
    private String customerName;
    private List<ItemSummaryDTO> items;
    private BigDecimal total;
    private BigDecimal tax;
    private BigDecimal shipping;
    private LocalDateTime orderedAt;
}
