package com.ecommerce.MyShopping.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.MyShopping.dto.CartItemDTO;
import com.ecommerce.MyShopping.dto.CartItemRequestDTO;
import com.ecommerce.MyShopping.dto.CartUpdateDTO;
import com.ecommerce.MyShopping.mapper.CartItemMapper;
import com.ecommerce.MyShopping.model.CartItem;
import com.ecommerce.MyShopping.model.User;
import com.ecommerce.MyShopping.service.CartItemService;
import com.ecommerce.MyShopping.service.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/v1/api/cart-items")
public class CartController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserService userService;

    @PostMapping
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<CartItemDTO> addCartItem(@RequestBody CartItemRequestDTO cartItemDTO,
            Authentication authentication) {
        // Checking and adding the cart to exiting and logged in user only

        CartItem savedCartItem = cartItemService.save(cartItemDTO, authentication);// Transferred havy logic to service
                                                                                   // layer
        return ResponseEntity.ok(CartItemMapper.toDto(savedCartItem));
    }

    @PostMapping("/updateOrAdd")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<CartItemDTO> updateOrAddCartItem(@RequestBody CartItemRequestDTO cartItemDTO,
            Authentication authentication) {
        CartItem updatedCartItem = cartItemService.update(cartItemDTO, authentication);
        return ResponseEntity.ok(CartItemMapper.toDto(updatedCartItem));
    }

    @GetMapping("/user/{userId}") // Admin only
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<List<CartItemDTO>> getCartItemsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(CartItemMapper.toDtoList(cartItemService.findByUserId(userId)));

    }

    @GetMapping("/user")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<List<CartItemDTO>> getCartItemWithAuth(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found with email: " + email));
        return ResponseEntity.ok(CartItemMapper.toDtoList(cartItemService.findByUserId(user.getId())));
    }

    @PutMapping("/increment")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<CartItemDTO> incrementCartItemQuantity(@RequestBody CartUpdateDTO cartItemRequestDTO,
            Authentication authentication) {
        CartItem updatedCartItem = cartItemService.incrementQuantity(cartItemRequestDTO, authentication);
        return ResponseEntity.ok(CartItemMapper.toDto(updatedCartItem));
    }

    @PutMapping("/decrement")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<CartItemDTO> decrementCartItemQuantity(@RequestBody CartUpdateDTO cartItemRequestDTO,
            Authentication authentication) {
        CartItem updatedCartItem = cartItemService.decrementQuantity(cartItemRequestDTO, authentication);
        if (updatedCartItem == null) {
            return ResponseEntity.noContent().build(); // or return ResponseEntity.ok(null) Otherwise, CartItemMapper
                                                       // will throw an exception as once complete item is removed,
                                                       // cartItem will be null and to avoid NullPointerException
                                                       // we return no content.
        }
        return ResponseEntity.ok(CartItemMapper.toDto(updatedCartItem));
    }

    @DeleteMapping("/{cartItemId}")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<String> removeCartItem(@PathVariable Long cartItemId, Authentication authentication) {
        cartItemService.deleteById(cartItemId, authentication);
        return ResponseEntity.ok("Cart item with ID: " + cartItemId + " has been removed.");
    }

    @DeleteMapping("/user/{userId}") // makng this for admin only
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<String> clearCartByUserId(@PathVariable Long userId) {
        cartItemService.deleteAllByUserId(userId);
        return ResponseEntity.ok("Cart cleared for user with ID: " + userId);
    }

    @DeleteMapping("/user") // makng this for admin only
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<String> clearCartByUser(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("User not found"));
        cartItemService.deleteAllByUserId(user.getId());
        return ResponseEntity.ok("Cart cleared for user with ID: " + user.getId());
    }

}
