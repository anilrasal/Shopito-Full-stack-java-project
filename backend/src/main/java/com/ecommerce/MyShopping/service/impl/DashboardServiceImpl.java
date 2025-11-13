package com.ecommerce.MyShopping.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.MyShopping.dto.DashboardStatsDTO;
import com.ecommerce.MyShopping.repository.OrderRepository;
import com.ecommerce.MyShopping.repository.ProductRepository;
import com.ecommerce.MyShopping.repository.UserRepository;
import com.ecommerce.MyShopping.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public DashboardStatsDTO getStats() {
        // Calculate total revenue and checking if there is any null value from database
        // as we set it as double and null will give an error.adminController
        double revenue = orderRepository.sumTotalRevenue() != null ? orderRepository.sumTotalRevenue() : 0.0;
        DashboardStatsDTO dto = new DashboardStatsDTO((int) productRepository.count(), (int) orderRepository.count(),
                (int) userRepository.count(), revenue);
        return dto;
    }
}
