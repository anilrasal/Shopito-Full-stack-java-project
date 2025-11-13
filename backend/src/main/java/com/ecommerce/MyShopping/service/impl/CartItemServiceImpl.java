package com.ecommerce.MyShopping.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ecommerce.MyShopping.dto.CartItemRequestDTO;
import com.ecommerce.MyShopping.dto.CartUpdateDTO;
import com.ecommerce.MyShopping.mapper.CartItemMapper;
import com.ecommerce.MyShopping.model.CartItem;
import com.ecommerce.MyShopping.model.Product;
import com.ecommerce.MyShopping.model.User;
import com.ecommerce.MyShopping.repository.CartItemRepository;
import com.ecommerce.MyShopping.service.CartItemService;
import com.ecommerce.MyShopping.service.ProductService;
import com.ecommerce.MyShopping.service.UserService;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Override
    public void deleteById(Long id, Authentication authentication) {
        // Checks if cart item exists before deleting and also check if it belongs to
        // User
        User user = userService.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User not found"));
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + id));
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new IllegalStateException("Unauthorized to delete this cart item");
        }
        cartItemRepository.deleteById(id);
    }

    @Override
    public Optional<CartItem> findById(Long id) {
        return cartItemRepository.findById(id);
    }

    @Override
    public CartItem update(CartItemRequestDTO cartItemDTO, Authentication authentication) {
        // Updated with user id from authentication.

        String email = authentication.getName();

        User user = userService.findByEmail(email).orElseThrow(() -> new IllegalStateException("User not found"));

        // User user = userService.findById(cartItemDTO.getUserId())
        // .orElseThrow(() -> new RuntimeException("User not found with id: " +
        // cartItemDTO.getUserId()));

        Product product = productService.findById(cartItemDTO.getProductId())
                .orElseThrow(() -> new RuntimeException(
                        "Product not found with id: " + cartItemDTO.getProductId()));
        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductId(user.getId(), product.getId());
        if (existingItem.isPresent()) {
            // If it exists, update the quantity
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(cartItemDTO.getQuantity());
            return cartItemRepository.save(cartItem);
        }
        CartItem cartItem = CartItemMapper.toCartItem(cartItemDTO, product, user);
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem save(CartItemRequestDTO cartItemDTO, Authentication authentication) {
        // Getting the user and product from the database
        // and mapping the CartItemDTO to CartItem.
        // Validate user and product existence before saving the cart item
        // If either user or product is not found, throw an exception
        // this ensures that the cart item is valid before saving it.

        String email = authentication.getName();
        User user = userService.findByEmail(email).orElseThrow(() -> new IllegalStateException("User not found"));
        // User user = userService.findById(cartItemDTO.getUserId())
        // .orElseThrow(() -> new RuntimeException("User not found with id: " +
        // cartItemDTO.getUserId()));
        // Product product =
        // productService.findById(cartItemDTO.getProductDTO().getId())
        // .orElseThrow(() -> new RuntimeException(
        // "Product not found with id: " + cartItemDTO.getProductDTO().getId()));
        Product product = productService.findById(cartItemDTO.getProductId())
                .orElseThrow(() -> new RuntimeException(
                        "Product not found with id: " + cartItemDTO.getProductId()));

        // Check if cart item already exists for this user and product
        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductId(user.getId(), product.getId());
        if (existingItem.isPresent()) {
            // If it exists, update the quantity
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + cartItemDTO.getQuantity());
            return cartItemRepository.save(cartItem);
        }
        // If it doesn't exist, create a new CartItem
        // and save it to the database.
        CartItem cartItem = CartItemMapper.toCartItem(cartItemDTO, product, user);
        return cartItemRepository.save(cartItem);
    }

    @Override
    public List<CartItem> findByUserId(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public void deleteAll(List<CartItem> cartItems) {
        cartItemRepository.deleteAll(cartItems);
    }

    @Override
    public void deleteAllByUserId(Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        cartItemRepository.deleteAll(cartItems);
    }

    @Override
    public CartItem incrementQuantity(CartUpdateDTO cartItemRequestDTO, Authentication authentication) {
        User user = userService.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User not found"));
        Optional<CartItem> optionalCartItem = cartItemRepository
                .findByUserIdAndProductId(user.getId(), cartItemRequestDTO.getProductId());
        if (optionalCartItem.isPresent()) {
            CartItem cartItem = optionalCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            return cartItemRepository.save(cartItem);
        } else {
            throw new RuntimeException("Cart item not found for user ID: " + cartItemRequestDTO.getUserId() +
                    " and product ID: " + cartItemRequestDTO.getProductId());
        }
    }

    @Override
    public CartItem decrementQuantity(CartUpdateDTO cartItemRequestDTO, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email).orElseThrow(() -> new IllegalStateException("user not found"));
        CartItem cartItem = cartItemRepository
                .findByUserIdAndProductId(user.getId(), cartItemRequestDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        ;

        int currentQuantity = cartItem.getQuantity();
        if (currentQuantity <= 1) {
            cartItemRepository.delete(cartItem); // Remove item if quantity drops to 0
            return null; // Return null if the item is deleted
        }

        cartItem.setQuantity(currentQuantity - 1);
        return cartItemRepository.save(cartItem);

    }

}
