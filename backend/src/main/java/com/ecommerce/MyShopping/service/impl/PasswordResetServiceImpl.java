package com.ecommerce.MyShopping.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.MyShopping.dto.PasswordResetDTO;
import com.ecommerce.MyShopping.model.PasswordResetToken;
import com.ecommerce.MyShopping.model.User;
import com.ecommerce.MyShopping.repository.PasswordResetTokenRepository;
import com.ecommerce.MyShopping.repository.UserRepository;
import com.ecommerce.MyShopping.service.EmailService;
import com.ecommerce.MyShopping.service.PasswordResetService;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void createPasswordResetToken(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalStateException("User not found"));

        String token = UUID.randomUUID().toString();
        Optional<PasswordResetToken> optionalResetToken = tokenRepository.findByUserId(user.getId());
        PasswordResetToken resetToken;
        if (optionalResetToken.isPresent()) {
            resetToken = optionalResetToken.get();
        } else {
            resetToken = new PasswordResetToken();
        }
        resetToken.setUser(user);
        resetToken.setToken(token);
        resetToken.setExpiryTime(LocalDateTime.now().plusMinutes(15));// 15 minutes expiry
        tokenRepository.save(resetToken);

        emailService.sendPasswordResetEmail(email, token);
    }

    @Override
    public void resetPassword(PasswordResetDTO passwordResetDTO) {
        PasswordResetToken resetToken = tokenRepository.findByToken(passwordResetDTO.getToken())
                .orElseThrow(() -> new IllegalStateException("Invalid Token"));

        if (resetToken.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(passwordResetDTO.getPassword()));
        userRepository.save(user);

        tokenRepository.delete(resetToken);
    }

}
