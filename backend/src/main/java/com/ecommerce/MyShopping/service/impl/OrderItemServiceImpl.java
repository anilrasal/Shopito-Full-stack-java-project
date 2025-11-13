package com.ecommerce.MyShopping.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.MyShopping.dto.OrderItemRequestDTO;
import com.ecommerce.MyShopping.mapper.OrderMapper;
import com.ecommerce.MyShopping.mapper.ProductMapper;
import com.ecommerce.MyShopping.model.Order;
import com.ecommerce.MyShopping.model.OrderItem;
import com.ecommerce.MyShopping.model.Product;
import com.ecommerce.MyShopping.repository.OrderItemRepository;
import com.ecommerce.MyShopping.repository.OrderRepository;
import com.ecommerce.MyShopping.service.OrderItemService;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    private OrderRepository orderRepository;

    OrderItemServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public OrderItem save(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public void deleteById(Long id) {
        orderItemRepository.deleteById(id);
    }

    @Override
    public Optional<OrderItem> findById(Long id) {
        return orderItemRepository.findById(id);
    }

    @Override
    public OrderItem update(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public List<OrderItem> findByOrderId(Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    @Override
    public OrderItem saveItem(OrderItemRequestDTO orderItemRequestDTO) {

        Order order = orderRepository.findById(orderItemRequestDTO.getOrderId())
                .orElseThrow(
                        () -> new RuntimeException("Order not found with id: " + orderItemRequestDTO.getOrderId()));
        Product product = ProductMapper.toProduct(orderItemRequestDTO.getProduct());
        OrderItem orderItem = OrderMapper.toOrderItem(orderItemRequestDTO, order, product);
        return orderItem;
    }

    @Override
    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }

}
