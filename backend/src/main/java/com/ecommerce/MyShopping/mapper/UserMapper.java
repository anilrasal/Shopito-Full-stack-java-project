package com.ecommerce.MyShopping.mapper;

import com.ecommerce.MyShopping.dto.UserDTO;
import com.ecommerce.MyShopping.dto.UserRegisterDTO;
import com.ecommerce.MyShopping.model.User;

public class UserMapper {

    public static UserRegisterDTO toDto(User user) {
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO();
        userRegisterDTO.setName(user.getName());
        userRegisterDTO.setEmail(user.getEmail());
        userRegisterDTO.setPassword(user.getPassword());
        userRegisterDTO.setAddress(user.getAddress());
        userRegisterDTO.setPhoneNumber(user.getPhoneNumber());
        return userRegisterDTO;
    }

    public static UserDTO toDtoUser(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setRole(user.getRole().toString());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setAddress(user.getAddress());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        return userDTO;
    }

    public static User toEntity(UserRegisterDTO userRegisterDTO) {
        User user = new User();
        user.setName(userRegisterDTO.getName());
        user.setEmail(userRegisterDTO.getEmail());
        user.setPassword(userRegisterDTO.getPassword());
        user.setAddress(userRegisterDTO.getAddress());
        user.setPhoneNumber(userRegisterDTO.getPhoneNumber());
        return user;
    }

    public static User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setAddress(userDTO.getAddress());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        return user;
    }

}
