// backend/src/main/java/com/smartshelfx/service/AnalyticsService.java

package com.smartshelfx.service;

import com.smartshelfx.dto.AnalyticsResponse;
import com.smartshelfx.repository.ProductRepository;
import com.smartshelfx.repository.StockTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import com.smartshelfx.model.Product;
import com.smartshelfx.model.StockTransaction;


@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ProductRepository productRepository;
    private final StockTransactionRepository transactionRepository;

    // public AnalyticsResponse getInventoryTrends() {
    //     AnalyticsResponse response = new AnalyticsResponse();
    //     response.setTitle("Inventory Trends");
    //     response.setLabels(Arrays.asList("Week 1", "Week 2", "Week 3", "Week 4"));

    //     Map<String, Object> dataset = new HashMap<>();
    //     dataset.put("label", "Inventory Value");
    //     dataset.put("data", Arrays.asList(45000, 52000, 48000, 55000));

    //     response.setDatasets(Collections.singletonList(dataset));
    //     return response;
    // }


//     public AnalyticsResponse getInventoryTrends() {


//     for (int i = 3; i >= 0; i--) {
//         LocalDate start = today.minusWeeks(i + 1);
//         LocalDate end = today.minusWeeks(i);

//         // Get stock transactions for that week
//         List<StockTransaction> weekTransactions =
//                 transactionRepository.findByDateRange(
//                         start.atStartOfDay(),
//                         end.atTime(23, 59, 59)
//                 );

//         double totalValue = 0;

//         for (StockTransaction tx : weekTransactions) {
//             Product p = tx.getProduct();
//             if (p.getPrice() != null) {
//                 totalValue += tx.getNewStock() * p.getPrice();
//             }
//         }

//         values.add(totalValue);
//     }

//     // Build response
//     AnalyticsResponse response = new AnalyticsResponse();
//     response.setTitle("Inventory Trend");
//     response.setLabels(labels);

//     Map<String, Object> dataset = new HashMap<>();
//     dataset.put("label", "Inventory Value");
//     dataset.put("data", values);

//     response.setDatasets(Collections.singletonList(dataset));
//     return response;
// }





    public AnalyticsResponse getInventoryTrend() {

    List<String> labels = List.of("Week 1", "Week 2", "Week 3", "Week 4");

    // Use current inventory value for all 4 weeks (placeholder)
    Double currentValue = productRepository.calculateTotalInventoryValue();
    if (currentValue == null) currentValue = 0.0;

    List<Double> values = List.of(
            currentValue * 0.85,   // pretend 15% lower
            currentValue * 1.12,   // pretend 12% higher
            currentValue * 0.95,   // pretend small drop
            currentValue * 1.25    // pretend rise
    );

    AnalyticsResponse response = new AnalyticsResponse();
    response.setTitle("Inventory Trend");
    response.setLabels(labels);

    Map<String, Object> dataset = new HashMap<>();
    dataset.put("label", "Inventory Value");
    dataset.put("data", values);

    response.setDatasets(List.of(dataset));

    return response;
}



    // public AnalyticsResponse getTopProducts(Integer limit) {
    //     AnalyticsResponse response = new AnalyticsResponse();
    //     response.setTitle("Top Products");
    //     response.setLabels(Arrays.asList("Product 1", "Product 2", "Product 3"));

    //     Map<String, Object> dataset = new HashMap<>();
    //     dataset.put("data", Arrays.asList(150, 120, 90));

    //     response.setDatasets(Collections.singletonList(dataset));
    //     return response;
    // }



//     public AnalyticsResponse getTopProducts(Integer limit) {

//     List<Object[]> results = transactionRepository.findTopProducts(limit);

//     List<String> labels = new ArrayList<>();
//     List<Integer> values = new ArrayList<>();

//     for (Object[] row : results) {
//         String productName = (String) row[0];
//         Long totalMovement = (Long) row[1];

//         labels.add(productName);
//         values.add(totalMovement.intValue());
//     }

//     Map<String, Object> dataset = new HashMap<>();
//     dataset.put("label", "Top Products");
//     dataset.put("data", values);

//     AnalyticsResponse response = new AnalyticsResponse();
//     response.setTitle("Top Products");
//     response.setLabels(labels);
//     response.setDatasets(Collections.singletonList(dataset));

//     return response;
//  }


    public AnalyticsResponse getTopProducts(Integer limit) {

    List<Product> allProducts = productRepository.findAll();

    // Map product name → movement
    Map<String, Integer> movementMap = new HashMap<>();

    // Initialize all products with 0
    for (Product p : allProducts) {
        movementMap.put(p.getName(), 0);
    }

    // Get actual movement
    List<Object[]> results = transactionRepository.sumMovementForAllProducts();

    for (Object[] row : results) {
        String productName = (String) row[0];
        Long totalMovement = (Long) row[1];

        movementMap.put(productName, totalMovement.intValue());
    }

    // Sort by movement desc
    List<Map.Entry<String, Integer>> sorted =
            movementMap.entrySet().stream()
                    .sorted((a, b) -> b.getValue() - a.getValue())
                    .limit(limit)
                    .toList();

    List<String> labels = sorted.stream().map(Map.Entry::getKey).toList();
    List<Integer> values = sorted.stream().map(Map.Entry::getValue).toList();

    AnalyticsResponse response = new AnalyticsResponse();
    response.setTitle("Top Products");

    Map<String, Object> dataset = new HashMap<>();
    dataset.put("label", "Top Products");
    dataset.put("data", values);

    response.setLabels(labels);
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


    public AnalyticsResponse getMonthlyStockMovement() {

    List<Object[]> rows = transactionRepository.getMonthlyStockMovement();

    List<String> labels = new ArrayList<>();
    List<Integer> stockIn = new ArrayList<>();
    List<Integer> stockOut = new ArrayList<>();

    String[] monthNames = {
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    };

    for (Object[] row : rows) {
        Integer monthNumber = ((Number) row[0]).intValue();
        Integer inQty = ((Number) row[1]).intValue();
        Integer outQty = ((Number) row[2]).intValue();

        labels.add(monthNames[monthNumber - 1]);
        stockIn.add(inQty);
        stockOut.add(outQty);
    }

    AnalyticsResponse response = new AnalyticsResponse();
    response.setTitle("Monthly Stock Movement");
    response.setLabels(labels);

    Map<String, Object> inDataset = new HashMap<>();
    inDataset.put("label", "Stock In");
    inDataset.put("data", stockIn);

    Map<String, Object> outDataset = new HashMap<>();
    outDataset.put("label", "Stock Out");
    outDataset.put("data", stockOut);

    response.setDatasets(List.of(inDataset, outDataset));

    return response;
}

}