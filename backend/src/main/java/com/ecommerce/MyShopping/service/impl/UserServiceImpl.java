package com.ecommerce.MyShopping.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.MyShopping.dto.ChangePasswordDTO;
import com.ecommerce.MyShopping.dto.UserDTO;
import com.ecommerce.MyShopping.dto.UserRegisterDTO;
import com.ecommerce.MyShopping.mapper.UserMapper;
import com.ecommerce.MyShopping.model.User;
import com.ecommerce.MyShopping.model.User.Role;
import com.ecommerce.MyShopping.repository.UserRepository;
import com.ecommerce.MyShopping.service.EmailService;
import com.ecommerce.MyShopping.service.UserService;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UserDTO> findAll() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            UserDTO userDTO = UserMapper.toDtoUser(user);
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }

    @Override
    public User save(UserRegisterDTO userRegisterDTO) {
        User user = UserMapper.toEntity(userRegisterDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with email " + user.getEmail() + " already exists.");
        }
        if (user.getRole() == null) {
            user.setRole(User.Role.USER); // Default role if not set
        }
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("Account not found");
        }

        User user = userOptional.get();
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().toString()));

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    @Override
    public Optional<User> findByRole(User.Role role) {
        return userRepository.findByRole(role);

    }

    @Override
    public void updateUserRole(Long userId, Role role) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User with ID " + userId + " not found.");
        }
        User user = userOptional.get();
        user.setRole(role);
        userRepository.save(user);
    }

    @Override
    public Optional<User> findFirstByRole(Role role) {
        return userRepository.findFirstByRole(role);
    }

    @Override
    public Page<UserDTO> findAll(Pageable pageable) {
        Page<User> userPage = userRepository.findAll(pageable);
        return userPage.map(UserMapper::toDtoUser);// Convert User entities to UserDTOs
    }

    @Override
    public Long countByRole(Role role) {
        return userRepository.countByRole(role);
    }

    @Override
    public UserDTO updateUser(String email, UserDTO userDTO) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        user.setAddress(userDTO.getAddress());
        // user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        return UserMapper.toDtoUser(userRepository.save(user));
    }

    @Override
    @Transactional
    public void changePassword(String email, ChangePasswordDTO changePasswordDTO) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalStateException("User not found"));
        if (passwordEncoder.matches(changePasswordDTO.getCurrentPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
            userRepository.save(user);
            emailService.sendPasswordChangeEmail(email,
                    "Password changed successfully. If this wasn't you, contact support immediately.");
        } else {
            throw new IllegalStateException("Current password didn't match");
        }
    }

}
