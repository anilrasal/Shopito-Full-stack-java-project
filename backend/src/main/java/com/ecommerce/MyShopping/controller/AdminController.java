package com.ecommerce.MyShopping.controller;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.MyShopping.dto.DashboardStatsDTO;
import com.ecommerce.MyShopping.dto.ProductDTO;
import com.ecommerce.MyShopping.dto.RoleUpdateDTO;
import com.ecommerce.MyShopping.dto.UserDTO;
import com.ecommerce.MyShopping.model.User;
import com.ecommerce.MyShopping.service.DashboardService;
import com.ecommerce.MyShopping.service.ProductService;
import com.ecommerce.MyShopping.service.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/v1/api/admin")
public class AdminController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @GetMapping("/dashboard")
    @SecurityRequirement(name = "anil-shopping-api")

    public ResponseEntity<DashboardStatsDTO> getDashboard() {
        return ResponseEntity.ok(dashboardService.getStats());
    }

    @GetMapping("/products")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<Page<ProductDTO>> getAllProductsForAdmin(
            @RequestParam(required = false) String category,
            @ParameterObject Pageable pageable) {
        Page<ProductDTO> productPage;
        if (category != null && !category.isBlank()) {
            productPage = productService.findByCategory(category, pageable);
        } else {
            productPage = productService.findAll(pageable);
        }
        // This returns a Page<ProductDTO> which includes:

        // content: list of products

        // totalPages, totalElements, number, size, etc.

        return ResponseEntity.ok(productPage);
    }

    @PutMapping("/users/{userId}/role")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<String> updateUserRole(
            @PathVariable Long userId,
            @RequestBody RoleUpdateDTO roleUpdateDTO) {

        // Checking if user is available before updating role.
        User target = userService.findById(userId).orElseThrow(() -> new IllegalStateException("User not found"));

        // Checking if role of user is changing from ADMIN to other role
        if (target.getRole() == User.Role.ADMIN && roleUpdateDTO.getRole() != User.Role.ADMIN) {
            long adminCount = userService.countByRole(User.Role.ADMIN);
            if (adminCount <= 1) {
                throw new IllegalStateException("Cannot downgrade the last admin");
            }
        }
        userService.updateUserRole(userId, roleUpdateDTO.getRole());
        return ResponseEntity.ok("User role updated successfully.");
    }

    @GetMapping("/users")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<Page<UserDTO>> getAllUsers(@ParameterObject Pageable pageable) {
        Page<UserDTO> userPage = userService.findAll(pageable);
        return ResponseEntity.ok(userPage);
    }
}
