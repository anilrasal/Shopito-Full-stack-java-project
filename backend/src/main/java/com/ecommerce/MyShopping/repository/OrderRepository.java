package com.ecommerce.MyShopping.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecommerce.MyShopping.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    @Query("SELECT SUM(o.total) FROM orders o")
    Double sumTotalRevenue();

    Page<Order> findByStatus(String status, Pageable pageable);

    Page<Order> findAll(Pageable pageable);
}