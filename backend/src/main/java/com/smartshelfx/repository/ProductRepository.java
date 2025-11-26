package com.smartshelfx.repository;

import com.smartshelfx.model.Product;
import com.smartshelfx.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySku(String sku);

    List<Product> findByCategory(String category);

    List<Product> findByVendor(User vendor);

    List<Product> findByNameContainingIgnoreCase(String name);

    @Query("SELECT p FROM Product p WHERE p.currentStock < p.reorderLevel")
    List<Product> findLowStockProducts();

    @Query("SELECT COUNT(p) FROM Product p WHERE p.currentStock < p.reorderLevel")
    Long countLowStockProducts();

    @Query("SELECT SUM(p.currentStock * p.price) FROM Product p")
    Double calculateTotalInventoryValue();

    @Query("SELECT DISTINCT p.category FROM Product p")
    List<String> findAllCategories();

    @Query("SELECT SUM(p.currentStock * p.price) FROM Product p")
    Double calculateCurrentInventoryValue();


    Boolean existsBySku(String sku);
}