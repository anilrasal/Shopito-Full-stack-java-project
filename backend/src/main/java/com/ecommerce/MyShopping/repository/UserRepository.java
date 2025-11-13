package com.ecommerce.MyShopping.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.MyShopping.model.User;
import com.ecommerce.MyShopping.model.User.Role;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom query to find a user by email
    Optional<User> findByEmail(String email);

    // Custom query to check if a user exists by email
    boolean existsByEmail(String email);

    Optional<User> findByRole(Role role);

    Optional<User> findFirstByRole(Role role);

    Page<User> findAll(Pageable pageable);

    Long countByRole(Role role);

}
