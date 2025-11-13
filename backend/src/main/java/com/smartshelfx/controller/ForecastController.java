package com.smartshelfx.controller;

import com.smartshelfx.dto.*;
import com.smartshelfx.service.AIForecastService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/forecast")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ForecastController {

    private final AIForecastService aiService;

    @GetMapping("/product/{productId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ForecastDTO> getForecastForProduct(
            @PathVariable Long productId,
            @RequestParam(required = false, defaultValue = "30") Integer days) {
        return ResponseEntity.ok(aiService.getForecastForProduct(productId, days));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Map<String, Object>> getBulkForecast(
            @RequestBody(required = false) Map<String, List<Long>> request) {
        List<Long> productIds = request != null ? request.get("product_ids") : null;
        return ResponseEntity.ok(aiService.getBulkForecast(productIds));
    }

    @GetMapping("/at-risk")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Map<String, Object>> getProductsAtRisk() {
        return ResponseEntity.ok(aiService.getProductsAtRisk());
    }

    @GetMapping("/summary")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ForecastSummaryDTO> getForecastSummary() {
        return ResponseEntity.ok(aiService.getForecastSummary());
    }

    @GetMapping("/test-connection")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Map<String, Object>> testConnection() {
        return ResponseEntity.ok(aiService.testConnection());
    }
}