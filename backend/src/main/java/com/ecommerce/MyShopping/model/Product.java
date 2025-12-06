package com.ecommerce.MyShopping.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private BigDecimal price;// BigDecimal for price → avoids floating point rounding issues.

    // Use BigDecimal for monetary values to avoid floating point precision issues.

    @Column(columnDefinition = "TEXT") // @Lob for description → useful if you plan to support long-form HTML content.

    // If you want to store large text data, use @Lob annotation.
    private String description;

    private String imageUrl;

    private Integer inventory;

    private String category;
}
