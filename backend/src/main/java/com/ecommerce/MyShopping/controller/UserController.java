package com.ecommerce.MyShopping.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.ecommerce.MyShopping.dto.ChangePasswordDTO;
import com.ecommerce.MyShopping.dto.UserDTO;
import com.ecommerce.MyShopping.dto.UserRegisterDTO;
import com.ecommerce.MyShopping.mapper.UserMapper;
import com.ecommerce.MyShopping.model.User;
import com.ecommerce.MyShopping.service.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/v1/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegisterDTO userRegisterDTO) {
        User registeredUser = userService.save(userRegisterDTO);
        return ResponseEntity.ok(registeredUser);
    }

    @GetMapping("/{id}/profile")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.get());
    }

    @GetMapping("/profile")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<UserDTO> getProfile(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> user = userService.findByEmail(email);
        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(UserMapper.toDtoUser(user.get()));
    }

    @GetMapping
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<List<UserDTO>> getAllusers() {
        List<UserDTO> users = userService.findAll();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    @PutMapping("/profile/update")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO, Authentication authentication) {
        UserDTO updatedUser = userService.updateUser(authentication.getName(), userDTO);
        return ResponseEntity.ok().body(updatedUser);
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        Optional<User> optionalUser = userService.findById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        long adminCount = userService.countByRole(User.Role.ADMIN);
        if (adminCount <= 1 && optionalUser.get().getRole() == User.Role.ADMIN) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/profile/change-password")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO ChangePassowrdDTO,
            Authentication authentication) {
        try {
            userService.changePassword(authentication.getName(), ChangePassowrdDTO);
            return ResponseEntity.ok().body("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable change password" + e);
        }
    }

}
