package com.ecommerce.MyShopping.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.ecommerce.MyShopping.dto.CartItemDTO;
import com.ecommerce.MyShopping.dto.CartItemRequestDTO;
import com.ecommerce.MyShopping.model.CartItem;
import com.ecommerce.MyShopping.model.Product;
import com.ecommerce.MyShopping.model.User;

public class CartItemMapper {

    public static List<CartItemDTO> toDtoList(List<CartItem> cartItems) {

        return cartItems.stream()
                .map(CartItemMapper::toDto)
                .collect(Collectors.toList());
    }

    public static CartItemDTO toDto(CartItem cartItem) {
        if (cartItem == null) {
            return null; // or throw a custom exception, or return an empty DTO
        }
        CartItemDTO dto = new CartItemDTO();
        dto.setId(cartItem.getId());
        // dto.setUserId(cartItem.getUser().getId());
        dto.setProductId(cartItem.getProduct().getId());
        dto.setQuantity(cartItem.getQuantity());
        dto.setProductDTO(ProductMapper.toProductDTO(cartItem.getProduct()));
        return dto;
    }

    // public static CartItem toCartItem(CartItemDTO dto, Product product, User
    // user) {
    // CartItem cartItem = new CartItem();
    // cartItem.setProduct(product);
    // cartItem.setQuantity(dto.getQuantity());
    // cartItem.setUser(user);
    // return cartItem;
    // }

    public static CartItem toCartItem(CartItemRequestDTO cartItemRequestDTO, Product product, User user) {
        CartItem cartItem = new CartItem();
        cartItem.setQuantity(cartItemRequestDTO.getQuantity());
        cartItem.setProduct(product);
        cartItem.setUser(user);
        return cartItem;
    }

}
