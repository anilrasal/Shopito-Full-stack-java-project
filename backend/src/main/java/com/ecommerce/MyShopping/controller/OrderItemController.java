package com.ecommerce.MyShopping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.MyShopping.dto.OrderItemRequestDTO;
import com.ecommerce.MyShopping.model.OrderItem;
import com.ecommerce.MyShopping.service.OrderItemService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/v1/api/order-items")
public class OrderItemController {

    // Optional endpoint at /v1/api/order-items lets you manually insert OrderItem
    // if needed.

    // Could be useful for admin tools or back-office operations.

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<OrderItem> addOrderItem(@RequestBody OrderItemRequestDTO orderItemRequestDTO) {
        OrderItem savedOrderItem = orderItemService.saveItem(orderItemRequestDTO);
        return ResponseEntity.ok(savedOrderItem);
    }

    @GetMapping()
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<List<OrderItem>> allOrders() {
        return ResponseEntity.ok(orderItemService.findAll());
    }

    @GetMapping("/order/{orderId}")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<List<OrderItem>> getOrderItemsByOrderId(@PathVariable Long orderId) {
        List<OrderItem> orderItems = orderItemService.findByOrderId(orderId);
        if (orderItems.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orderItems);
    }
}
