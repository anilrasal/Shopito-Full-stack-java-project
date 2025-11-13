package com.ecommerce.MyShopping.mapper;

import java.util.List;

import com.ecommerce.MyShopping.dto.OrderDTO;
import com.ecommerce.MyShopping.dto.OrderItemDTO;
import com.ecommerce.MyShopping.dto.OrderItemRequestDTO;
import com.ecommerce.MyShopping.dto.OrderResponseDTO;
import com.ecommerce.MyShopping.model.Order;
import com.ecommerce.MyShopping.model.OrderItem;
import com.ecommerce.MyShopping.model.Product;
import com.ecommerce.MyShopping.model.User;

// Utility class to map between DTOs and model entities for orders
// This class provides static methods to convert between different representations of orders
// and order items, facilitating the separation of concerns in the application architecture.
// It helps in transforming data from the request format to the internal model format and vice versa.
public class OrderMapper {

    public static Order toOrder(OrderDTO dto, User user, List<OrderItem> items) {
        Order order = new Order();
        order.setUser(user);
        order.setItems(items);
        order.setTotal(dto.getTotalAmount());
        order.setStatus(dto.getStatus());
        order.setCreatedAt(dto.getCreatedAt());
        return order;
    }

    public static OrderItem toOrderItem(OrderItemDTO dto, Order order, Product product) {
        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProduct(product);
        orderItem.setQuantity(dto.getQuantity());
        orderItem.setPrice(dto.getPrice());
        return orderItem;
    }

    public static OrderItem toOrderItem(OrderItemRequestDTO dto, Order order, Product product) {
        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setProduct(product);
        orderItem.setQuantity(dto.getQuantity());
        orderItem.setPrice(dto.getPrice());
        return orderItem;
    }

    public static OrderResponseDTO toOrderResponseDTO(Order order) {
        List<OrderItemDTO> itemDTOs = order.getItems().stream().map(i -> {
            OrderItemDTO dto = new OrderItemDTO();
            dto.setProduct(ProductMapper.toProductDTO(i.getProduct()));// Nested Mapper to change from product to DTO
            dto.setQuantity(i.getQuantity());
            dto.setPrice(i.getPrice());
            dto.setId(order.getId());
            return dto;
        }).toList();
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setOrderId(order.getId());
        dto.setUserId(order.getUser().getId());
        dto.setOrderDate(order.getCreatedAt());
        dto.setOrderItems(itemDTOs);
        dto.setStatus(order.getStatus());
        return dto;
    }
}
