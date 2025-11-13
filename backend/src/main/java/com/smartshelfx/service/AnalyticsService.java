package com.smartshelfx.service;

import com.smartshelfx.dto.AnalyticsResponse;
import com.smartshelfx.repository.ProductRepository;
import com.smartshelfx.repository.StockTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ProductRepository productRepository;
    private final StockTransactionRepository transactionRepository;

    public AnalyticsResponse getInventoryTrends() {
        AnalyticsResponse response = new AnalyticsResponse();
        response.setTitle("Inventory Trends");
        response.setLabels(Arrays.asList("Week 1", "Week 2", "Week 3", "Week 4"));

        Map<String, Object> dataset = new HashMap<>();
        dataset.put("label", "Inventory Value");
        dataset.put("data", Arrays.asList(45000, 52000, 48000, 55000));

        response.setDatasets(Collections.singletonList(dataset));
        return response;
    }

    public AnalyticsResponse getTopProducts(Integer limit) {
        AnalyticsResponse response = new AnalyticsResponse();
        response.setTitle("Top Products");
        response.setLabels(Arrays.asList("Product 1", "Product 2", "Product 3"));

        Map<String, Object> dataset = new HashMap<>();
        dataset.put("data", Arrays.asList(150, 120, 90));

        response.setDatasets(Collections.singletonList(dataset));
        return response;
    }

    public AnalyticsResponse getSalesComparison(Integer months) {
        AnalyticsResponse response = new AnalyticsResponse();
        response.setTitle("Sales Comparison");
        response.setLabels(Arrays.asList("Jan", "Feb", "Mar", "Apr", "May", "Jun"));

        Map<String, Object> dataset1 = new HashMap<>();
        dataset1.put("label", "Stock In");
        dataset1.put("data", Arrays.asList(650, 590, 800, 810, 560, 550));

        Map<String, Object> dataset2 = new HashMap<>();
        dataset2.put("label", "Stock Out");
        dataset2.put("data", Arrays.asList(450, 520, 600, 650, 490, 500));

        response.setDatasets(Arrays.asList(dataset1, dataset2));
        return response;
    }

    public ResponseEntity<byte[]> exportReport(String format) {
        // Simple implementation - can be enhanced with actual PDF/Excel generation
        String content = "SmartShelfX Analytics Report\n\n";
        content += "Generated on: " + new Date() + "\n";
        content += "Total Products: " + productRepository.count() + "\n";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "report." + format);

        return ResponseEntity.ok()
                .headers(headers)
                .body(content.getBytes());
    }
}