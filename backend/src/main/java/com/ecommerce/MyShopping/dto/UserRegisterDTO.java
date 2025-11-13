package com.ecommerce.MyShopping.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterDTO {
    private String name;
    private String email;
    private String password;
    private String address;
    private String phoneNumber;
}
