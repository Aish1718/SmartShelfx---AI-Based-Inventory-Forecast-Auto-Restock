package com.smartshelfx.controller;

import com.smartshelfx.dto.DashboardStats;
import com.smartshelfx.repository.ProductRepository;
import com.smartshelfx.repository.PurchaseOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final ProductRepository productRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        DashboardStats stats = new DashboardStats();
        stats.setTotalProducts(productRepository.count());
        stats.setLowStockCount(productRepository.countLowStockProducts());
        stats.setPendingOrders(purchaseOrderRepository.countByStatus("PENDING"));
        stats.setTotalValue(productRepository.calculateTotalInventoryValue());

        return ResponseEntity.ok(stats);
    }
}