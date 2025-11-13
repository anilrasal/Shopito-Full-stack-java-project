package com.ecommerce.MyShopping.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO {

    @NotNull
    @Email
    private String email;

    @NotNull
    @Schema(minimum = "5", description = "Password must be at least 6 characters long")
    private String password;
}
