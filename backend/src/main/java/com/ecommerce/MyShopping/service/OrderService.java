package com.ecommerce.MyShopping.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ecommerce.MyShopping.dto.AdminOrderDTO;
import com.ecommerce.MyShopping.dto.OrderResponseDTO;
import com.ecommerce.MyShopping.model.Order;

public interface OrderService {
    Order save(Order order);

    OrderResponseDTO findById(Long id);

    void deleteById(Long id);

    Order update(Order order);

    OrderResponseDTO placeOrderFromCart(Long userId);

    List<OrderResponseDTO> findAll();

    Page<AdminOrderDTO> getOrders(Pageable pageable, String status);

    Page<Order> findByStatus(String status, Pageable pageable);

    List<OrderResponseDTO> findByUserId(Long userId);

    void updateOrderStatus(Long orderID, String status);
}
