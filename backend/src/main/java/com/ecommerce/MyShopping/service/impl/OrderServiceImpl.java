package com.ecommerce.MyShopping.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.MyShopping.dto.AdminOrderDTO;
import com.ecommerce.MyShopping.dto.OrderResponseDTO;
import com.ecommerce.MyShopping.mapper.OrderMapper;
import com.ecommerce.MyShopping.model.CartItem;
import com.ecommerce.MyShopping.model.Order;
import com.ecommerce.MyShopping.model.OrderItem;
import com.ecommerce.MyShopping.repository.OrderRepository;
import com.ecommerce.MyShopping.service.OrderService;
import com.ecommerce.MyShopping.service.ProductService;
import com.ecommerce.MyShopping.service.UserService;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartItemServiceImpl cartItemService;

    @Autowired
    private OrderItemServiceImpl orderItemRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productservice;

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public OrderResponseDTO findById(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isEmpty()) {
            throw new IllegalArgumentException("Order not found with ID: " + id);
        }
        return OrderMapper.toOrderResponseDTO(order.get());
    }

    @Override
    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Order update(Order order) {
        return orderRepository.save(order);
    }

    @Override
    @Transactional
    public OrderResponseDTO placeOrderFromCart(Long userId) {
        // Checking the user exists
        userService.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        // Fetching cart items for the user
        List<CartItem> cartItems = cartItemService.findByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("Cart is empty for user ID: " + userId);
        }

        // Check stock availability

        // Creating a new order
        Order order = new Order();
        order.setUser(cartItems.get(0).getUser());
        order.setCreatedAt(LocalDateTime.now());
        order = orderRepository.save(order);

        BigDecimal totalAmount = BigDecimal.valueOf(0);// Initialize total amount to zero
        List<OrderItem> orderItems = new ArrayList<>();

        // Iterating through cart items to create order items
        // and calculate total amount
        for (CartItem cartItem : cartItems) {
            productservice.updateStock(cartItem.getProduct().getId(), cartItem.getQuantity());
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));

            totalAmount = totalAmount
                    .add(cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
            // Calculate total amount
            orderItems.add(orderItem);
            orderItemRepository.save(orderItem);
        }
        // Setting the total amount and items in the order
        order.setTotal(totalAmount);
        order.setItems(orderItems);
        order.setStatus("PLACED");
        order = orderRepository.save(order);
        cartItemService.deleteAll(cartItems); // Optional cleanup of the cart items
        return OrderMapper.toOrderResponseDTO(order);
    }

    @Override
    public List<OrderResponseDTO> findAll() {
        List<Order> orders = orderRepository.findAll();
        List<OrderResponseDTO> orderResponseDTOs = new ArrayList<>();
        for (Order order : orders) {
            orderResponseDTOs.add(OrderMapper.toOrderResponseDTO(order));
        }
        return orderResponseDTOs;
    }

    @Override
    public List<OrderResponseDTO> findByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        List<OrderResponseDTO> orderResponseDTOs = new ArrayList<>();
        for (Order order : orders) {
            // Converting each Order entity to OrderResponseDTO using the mapper
            // and adding it to the list
            orderResponseDTOs.add(OrderMapper.toOrderResponseDTO(order));
        }
        return orderResponseDTOs;
    }

    @Override
    public Page<Order> findByStatus(String status, Pageable pageable) {
        return orderRepository.findByStatus(status, pageable);
    }

    @Override
    public Page<AdminOrderDTO> getOrders(Pageable pageable, String status) {
        Page<Order> orders = (status != null && status != "")
                ? orderRepository.findByStatus(status, pageable)
                : orderRepository.findAll(pageable);
        return orders.map(order -> new AdminOrderDTO(
                order.getId(),
                order.getUser().getName(),
                order.getTotal(),
                order.getStatus(),
                order.getCreatedAt()));
    }

    @Override
    public void updateOrderStatus(Long orderID, String status) {
        Order order = orderRepository.findById(orderID).orElseThrow(() -> new IllegalStateException("Order not found"));
        System.out.println(status + "  : Status received");
        order.setStatus(status);
        orderRepository.save(order);
    }

}
