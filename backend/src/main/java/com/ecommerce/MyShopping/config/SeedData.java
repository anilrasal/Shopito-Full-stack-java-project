package com.ecommerce.MyShopping.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.ecommerce.MyShopping.model.User;
import com.ecommerce.MyShopping.service.UserService;

@Component
public class SeedData implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        Optional<User> optionalUser = userService.findFirstByRole(User.Role.ADMIN);
        if (!optionalUser.isPresent()) {
            User adminUser = new User();
            adminUser.setName("Admin");
            adminUser.setEmail("admin@admin.com");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setRole(User.Role.ADMIN);
            userService.save(adminUser);
            System.out.println("Checked for admin user on startup.");
        } else {
            System.out.println("ℹ️ Admin user already exists.");
        }
    }

}
