package com.ecommerce.MyShopping.dto;

import com.ecommerce.MyShopping.model.User;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleUpdateDTO {
    @NotNull
    @NotBlank
    private User.Role role;
}
