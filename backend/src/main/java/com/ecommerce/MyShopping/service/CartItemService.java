package com.ecommerce.MyShopping.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;

import com.ecommerce.MyShopping.dto.CartItemRequestDTO;
import com.ecommerce.MyShopping.dto.CartUpdateDTO;
import com.ecommerce.MyShopping.model.CartItem;

public interface CartItemService {

    CartItem save(CartItemRequestDTO cartItem, Authentication authentication);

    void deleteById(Long id, Authentication authentication);

    Optional<CartItem> findById(Long id);

    List<CartItem> findByUserId(Long userId);

    CartItem update(CartItemRequestDTO cartItemDTO, Authentication authentication);

    void deleteAllByUserId(Long userId);

    public CartItem incrementQuantity(CartUpdateDTO cartItemRequestDTO, Authentication authentication);

    public CartItem decrementQuantity(CartUpdateDTO cartItemRequestDTO, Authentication authentication);

}
