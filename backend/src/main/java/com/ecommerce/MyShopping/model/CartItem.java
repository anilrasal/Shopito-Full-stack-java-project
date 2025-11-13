package com.ecommerce.MyShopping.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore // Using @JsonIgnore to prevent circular references during serialization.
    // This is important to avoid infinite recursion when converting to JSON.
    private User user;

    @ManyToOne(fetch = FetchType.LAZY) // We're using @ManyToOne for both User and Product since each cart item belongs
                                       // to one user and references one product.
    @JoinColumn(name = "product_id")
    @JsonIgnore // Using @JsonIgnore to prevent circular references during serialization.
    // This is important to avoid infinite recursion when converting to JSON.
    private Product product;

    private Integer quantity; // Quantity: Captures how many units of a product the user has added.

}
