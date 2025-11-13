package com.ecommerce.MyShopping.service;

import com.ecommerce.MyShopping.dto.PasswordResetDTO;

public interface PasswordResetService {

    void createPasswordResetToken(String email);

    void resetPassword(PasswordResetDTO passwordResetDTO);
}
