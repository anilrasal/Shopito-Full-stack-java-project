package com.ecommerce.MyShopping.service;

import java.util.List;
import java.util.Optional;

import com.ecommerce.MyShopping.dto.OrderItemRequestDTO;
import com.ecommerce.MyShopping.model.OrderItem;

public interface OrderItemService {
    OrderItem save(OrderItem orderItem);

    OrderItem saveItem(OrderItemRequestDTO orderItemDTO);

    void deleteById(Long id);

    Optional<OrderItem> findById(Long id);

    OrderItem update(OrderItem orderItem);

    List<OrderItem> findByOrderId(Long orderId);

    List<OrderItem> findAll();
}
