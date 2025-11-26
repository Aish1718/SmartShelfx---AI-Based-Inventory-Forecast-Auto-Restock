package com.smartshelfx.controller;

import com.smartshelfx.dto.DashboardStats;
import com.smartshelfx.model.enums.OrderStatus;
import com.smartshelfx.repository.ProductRepository;
import com.smartshelfx.repository.PurchaseOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;


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
        // stats.setPendingOrders(purchaseOrderRepository.countByStatus("PENDING"));
        stats.setTotalValue(productRepository.calculateTotalInventoryValue());

        // Count Active Orders (Pending + Approved + Dispatched)
        Long activeOrders = purchaseOrderRepository.countByStatuses(
                Arrays.asList(
                        OrderStatus.PENDING,
                        OrderStatus.APPROVED,
                        OrderStatus.DISPATCHED
                )
        );

        stats.setPendingOrders(activeOrders);

        return ResponseEntity.ok(stats);
    }
}