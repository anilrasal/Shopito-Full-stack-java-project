package com.ecommerce.MyShopping.service;

import java.util.Optional;

import com.ecommerce.MyShopping.model.Payment;

public interface PaymentService {
    Payment save(Payment payment);

    Optional<Payment> findById(Long id);

    void deleteById(Long id);
}
