//PurchaseOrderController.java
package com.smartshelfx.controller;

import com.smartshelfx.dto.*;
import com.smartshelfx.model.enums.OrderStatus;
import com.smartshelfx.service.PurchaseOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/purchase-orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PurchaseOrderController {

    private final PurchaseOrderService poService;
    private final PurchaseOrderService purchaseOrderService;


    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<PurchaseOrderDTO> createPurchaseOrder(
            @Valid @RequestBody PurchaseOrderRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(poService.createPurchaseOrder(request));
    }

    @GetMapping
    public ResponseEntity<List<PurchaseOrderDTO>> getAllPurchaseOrders() {
        return ResponseEntity.ok(poService.getAllPurchaseOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseOrderDTO> getPurchaseOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(poService.getPurchaseOrderById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<PurchaseOrderDTO>> getPurchaseOrdersByStatus(
            @PathVariable OrderStatus status) {
        return ResponseEntity.ok(poService.getPurchaseOrdersByStatus(status));
    }

    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<PurchaseOrderDTO>> getPurchaseOrdersByVendor(
            @PathVariable Long vendorId) {
        return ResponseEntity.ok(poService.getPurchaseOrdersByVendor(vendorId));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'VENDOR')")
    public ResponseEntity<PurchaseOrderDTO> updateOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderStatusUpdateDTO updateDTO) {
        return ResponseEntity.ok(poService.updateOrderStatus(id, updateDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePurchaseOrder(@PathVariable Long id) {
        poService.deletePurchaseOrder(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/recommendations")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<List<RestockRecommendationDTO>> getRestockRecommendations() {
        return ResponseEntity.ok(poService.getRestockRecommendations());
    }

    @PostMapping("/auto-restock")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<List<PurchaseOrderDTO>> generateAutoRestockOrders() {
        return ResponseEntity.ok(poService.generateAutoRestockOrders());
    }

    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<PurchaseOrderDTO>> getOrdersByManager(@PathVariable Long managerId) {
        return ResponseEntity.ok(purchaseOrderService.getPurchaseOrdersByManager(managerId));
    }

}