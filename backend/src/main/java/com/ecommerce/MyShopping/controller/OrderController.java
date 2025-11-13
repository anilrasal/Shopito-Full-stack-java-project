package com.ecommerce.MyShopping.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.MyShopping.dto.OrderResponseDTO;
import com.ecommerce.MyShopping.model.Order;
import com.ecommerce.MyShopping.model.User;
import com.ecommerce.MyShopping.service.OrderService;
import com.ecommerce.MyShopping.service.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/v1/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.save(order);
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping("/{id}")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findById(id));
    }

    @PostMapping("/place-from-cart/{userId}")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<OrderResponseDTO> placeOrderFromCart(@PathVariable Long userId) {
        OrderResponseDTO orderResponseDTO = orderService.placeOrderFromCart(userId);
        if (orderResponseDTO == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(orderResponseDTO);
    }

    @PostMapping("/place-from-cart")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<OrderResponseDTO> placeOrderFromUserCart(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User not found wit"));
        OrderResponseDTO orderResponseDTO = orderService.placeOrderFromCart(user.getId());
        if (orderResponseDTO == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(orderResponseDTO);
    }

    @GetMapping
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.findAll());
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByUserId(@PathVariable("userId") Long user) {
        return ResponseEntity.ok(orderService.findByUserId(user));
    }

    @GetMapping("/user/orders")
    @SecurityRequirement(name = "anil-shopping-api")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<OrderResponseDTO>> getUserOrders(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> optionalUser = userService.findByEmail(email);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(orderService.findByUserId(optionalUser.get().getId()));
    }
}
