package com.ecommerce.MyShopping.controller;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.MyShopping.dto.AdminOrderDTO;
import com.ecommerce.MyShopping.dto.UpdateOrderStatusDTO;
import com.ecommerce.MyShopping.service.OrderService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/v1/api/admin/orders")
public class AdminOrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<Page<AdminOrderDTO>> getOrders(
            @ParameterObject Pageable pageable,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(orderService.getOrders(pageable, status));
    }

    @PatchMapping("/{orderId}/status")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<?> updateOrderStatus(@PathVariable("orderId") Long orderId,
            @RequestBody(required = true) UpdateOrderStatusDTO updateOrderStatusDTO) {
        System.out.println(
                "This is the status in controller: " + updateOrderStatusDTO.getStatus() + " , " + updateOrderStatusDTO);
        orderService.updateOrderStatus(orderId, updateOrderStatusDTO.getStatus());
        return ResponseEntity.ok().build();
    }

}
