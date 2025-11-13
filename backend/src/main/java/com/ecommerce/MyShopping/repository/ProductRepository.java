package com.ecommerce.MyShopping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.MyShopping.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM product WHERE LOWER(name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(description) LIKE LOWER(CONCAT('%', :query, '%'))", nativeQuery = true)
    List<Product> findByNameOrDescription(@Param("query") String query);

    Page<Product> findByCategoryContainingIgnoreCase(String categoryName, Pageable pageable);
}
