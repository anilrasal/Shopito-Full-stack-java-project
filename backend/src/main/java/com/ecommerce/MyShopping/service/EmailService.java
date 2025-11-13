package com.ecommerce.MyShopping.service;

public interface EmailService {

    void sendPasswordResetEmail(String to, String token);

    void sendPasswordChangeEmail(String to, String message);
}
