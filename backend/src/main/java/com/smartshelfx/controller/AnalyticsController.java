package com.smartshelfx.controller;

import com.smartshelfx.dto.AnalyticsResponse;
import com.smartshelfx.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/inventory-trends")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<AnalyticsResponse> getInventoryTrends() {
        return ResponseEntity.ok(analyticsService.getInventoryTrends());
    }

    @GetMapping("/top-products")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<AnalyticsResponse> getTopProducts(
            @RequestParam(defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(analyticsService.getTopProducts(limit));
    }

    @GetMapping("/sales-comparison")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<AnalyticsResponse> getSalesComparison(
            @RequestParam(defaultValue = "6") Integer months) {
        return ResponseEntity.ok(analyticsService.getSalesComparison(months));
    }

    @GetMapping("/export")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<byte[]> exportReport(
            @RequestParam(defaultValue = "pdf") String format) {
        return analyticsService.exportReport(format);
    }
}