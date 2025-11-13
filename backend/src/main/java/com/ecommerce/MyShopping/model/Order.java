package com.ecommerce.MyShopping.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "orders") // Entity annotation marks this class as a JPA entity.
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal total;

    private String status; // Status: Can be "PENDING", "SHIPPED", "DELIVERED", etc.

    private LocalDateTime createdAt; // createdAt: Timestamp for when the order was placed.

    @ManyToOne(fetch = FetchType.LAZY) // Many orders can be placed by one user, hence ManyToOne relationship.
    // FetchType.LAZY is used to avoid loading the user data unless explicitly
    // needed.
    @JoinColumn(name = "user_id") // JoinColumn specifies the foreign key column in the Order table.
    // This column will reference the User who placed the order.
    @JsonIgnore
    private User user; // user: Reference to the User who placed the order.

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items; // items: List of items in the order, each with a product and quantity.

}
