package com.ecommerce.MyShopping.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ecommerce.MyShopping.dto.ChangePasswordDTO;
import com.ecommerce.MyShopping.dto.UserDTO;
import com.ecommerce.MyShopping.dto.UserRegisterDTO;
import com.ecommerce.MyShopping.model.User;
import com.ecommerce.MyShopping.model.User.Role;

public interface UserService {
    Optional<User> findByEmail(String email);

    User save(User user);

    User save(UserRegisterDTO userRegisterDTO);

    Optional<User> findById(Long id);

    void deleteById(Long id);

    List<UserDTO> findAll();

    Page<UserDTO> findAll(Pageable pageable);

    Optional<User> findByRole(Role admin);

    Optional<User> findFirstByRole(Role admin);

    void updateUserRole(Long userId, Role role);

    Long countByRole(Role role);

    UserDTO updateUser(String email, UserDTO userDTO);

    void changePassword(String email, ChangePasswordDTO changePasswordDTO);
}
