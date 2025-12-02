// package com.smartshelfx.service;

// import com.smartshelfx.dto.*;
// import com.smartshelfx.exception.BadRequestException;
// import lombok.RequiredArgsConstructor;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.core.ParameterizedTypeReference;
// import org.springframework.http.*;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;
// import org.springframework.web.client.HttpClientErrorException;
// import org.springframework.web.client.ResourceAccessException;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;

// @Service
// @RequiredArgsConstructor
// public class AIForecastService {

//     @Value("${ai.service.url}")
//     private String aiServiceUrl;

//     private final RestTemplate restTemplate = new RestTemplate();

//     public ForecastDTO getForecastForProduct(Long productId, Integer days) {
//         try {
//             String url = String.format("%s/api/forecast/product/%d?days=%d",
//                                       aiServiceUrl, productId, days != null ? days : 30);

//             ResponseEntity<ForecastDTO> response = restTemplate.exchange(
//                 url,
//                 HttpMethod.GET,
//                 null,
//                 ForecastDTO.class
//             );

//             return response.getBody();

//         } catch (HttpClientErrorException e) {
//             throw new BadRequestException("AI Service Error: " + e.getResponseBodyAsString());
//         } catch (ResourceAccessException e) {
//             throw new BadRequestException("AI Service is not available. Please try again later.");
//         }
//     }

//     public Map<String, Object> getBulkForecast(List<Long> productIds) {
//         try {
//             String url = aiServiceUrl + "/api/forecast/bulk";

//             Map<String, Object> requestBody = new HashMap<>();
//             if (productIds != null && !productIds.isEmpty()) {
//                 requestBody.put("product_ids", productIds);
//             }

//             HttpHeaders headers = new HttpHeaders();
//             headers.setContentType(MediaType.APPLICATION_JSON);
//             HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

//             ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
//                 url,
//                 HttpMethod.POST,
//                 entity,
//                 new ParameterizedTypeReference<Map<String, Object>>() {}
//             );

//             return response.getBody();

//         } catch (HttpClientErrorException e) {
//             throw new BadRequestException("AI Service Error: " + e.getResponseBodyAsString());
//         } catch (ResourceAccessException e) {
//             throw new BadRequestException("AI Service is not available. Please try again later.");
//         }
//     }

//     public Map<String, Object> getProductsAtRisk() {
//         try {
//             String url = aiServiceUrl + "/api/forecast/at-risk";

//             ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
//                 url,
//                 HttpMethod.GET,
//                 null,
//                 new ParameterizedTypeReference<Map<String, Object>>() {}
//             );

//             return response.getBody();

//         } catch (HttpClientErrorException e) {
//             throw new BadRequestException("AI Service Error: " + e.getResponseBodyAsString());
//         } catch (ResourceAccessException e) {
//             throw new BadRequestException("AI Service is not available. Please try again later.");
//         }
//     }

//     public ForecastSummaryDTO getForecastSummary() {
//         try {
//             String url = aiServiceUrl + "/api/forecast/summary";

//             ResponseEntity<ForecastSummaryDTO> response = restTemplate.exchange(
//                 url,
//                 HttpMethod.GET,
//                 null,
//                 ForecastSummaryDTO.class
//             );

//             return response.getBody();

//         } catch (HttpClientErrorException e) {
//             throw new BadRequestException("AI Service Error: " + e.getResponseBodyAsString());
//         } catch (ResourceAccessException e) {
//             throw new BadRequestException("AI Service is not available. Please try again later.");
//         }
//     }

//     public Map<String, Object> testConnection() {
//         try {
//             String url = aiServiceUrl + "/api/forecast/test-connection";

//             ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
//                 url,
//                 HttpMethod.GET,
//                 null,
//                 new ParameterizedTypeReference<Map<String, Object>>() {}
//             );

//             return response.getBody();

//         } catch (Exception e) {
//             Map<String, Object> error = new HashMap<>();
//             error.put("status", "error");
//             error.put("message", "Failed to connect to AI service: " + e.getMessage());
//             return error;
//         }
//     }
// }




// package com.smartshelfx.service;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.core.ParameterizedTypeReference;
// import org.springframework.http.HttpMethod;
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;

// import java.util.List;
// import java.util.Map;

// @Service
// public class AIForecastService {

//     @Value("${ai.service.url:http://localhost:5000}")
//     private String aiServiceUrl;

//     private static final String API_PREFIX = "/api";

//     private final RestTemplate restTemplate;

//     public AIForecastService() {
//         this.restTemplate = new RestTemplate();
//     }

//     /**
//      * Calls the AI service /forecast/at-risk endpoint
//      * Returns a List of products at risk
//      */
//     public List<Map<String, Object>> getProductsAtRisk() {
//         String url = aiServiceUrl + API_PREFIX + "/forecast/at-risk";

//         System.out.println("🔍 Calling AI Service: " + url);

//         try {
//             ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
//                 url,
//                 HttpMethod.GET,
//                 null,
//                 new ParameterizedTypeReference<List<Map<String, Object>>>() {}
//             );

//             System.out.println("✅ AI Service Response: " + response.getStatusCode());
//             return response.getBody();

//         } catch (Exception e) {
//             System.err.println("❌ AI Service Error: " + e.getMessage());
//             throw new RuntimeException("Failed to fetch products at risk from AI service: " + e.getMessage(), e);
//         }
//     }

//     /**
//      * Get forecast for a single product
//      */
//     public Map<String, Object> getForecastForProduct(Long productId) {
//         String url = aiServiceUrl + API_PREFIX + "/forecast/" + productId;

//         System.out.println("🔍 Calling AI Service: " + url);

//         try {
//             ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
//                 url,
//                 HttpMethod.GET,
//                 null,
//                 new ParameterizedTypeReference<Map<String, Object>>() {}
//             );

//             System.out.println("✅ AI Service Response: " + response.getStatusCode());
//             return response.getBody();

//         } catch (Exception e) {
//             System.err.println("❌ AI Service Error: " + e.getMessage());
//             throw new RuntimeException("Failed to fetch forecast for product " + productId + ": " + e.getMessage(), e);
//         }
//     }
// }




// backend/src/main/java/com/smartshelfx/service/AIForecastService.java

// package com.smartshelfx.service;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.core.ParameterizedTypeReference;
// import org.springframework.http.HttpMethod;
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;

// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;

// @Service
// public class AIForecastService {

//     @Value("${ai.service.url:http://localhost:5000}")
//     private String aiServiceUrl;

//     private static final String API_PREFIX = "/api";

//     private final RestTemplate restTemplate;

//     public AIForecastService() {
//         this.restTemplate = new RestTemplate();
//     }

//     // ----------------------------------------------------
//     // 1) GET AT-RISK PRODUCTS  (GET /api/forecast/at-risk)
//     // ----------------------------------------------------
//     public List<Map<String, Object>> getProductsAtRisk() {
//         String url = aiServiceUrl + API_PREFIX + "/forecast/at-risk";

//         try {
//             ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
//                     url,
//                     HttpMethod.GET,
//                     null,
//                     new ParameterizedTypeReference<List<Map<String, Object>>>() {}
//             );
//             return response.getBody();

//         } catch (Exception e) {
//             throw new RuntimeException("AI Service failed: " + e.getMessage(), e);
//         }
//     }

//     // ----------------------------------------------------
//     // 2) FORECAST FOR ONE PRODUCT (GET /forecast/{id})
//     // ----------------------------------------------------
//     public Map<String, Object> getForecastForProduct(Long productId, Integer days) {
//         String url = aiServiceUrl + API_PREFIX + "/forecast/" + productId + "?days=" + days;

//         try {
//             ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
//                     url,
//                     HttpMethod.GET,
//                     null,
//                     new ParameterizedTypeReference<Map<String, Object>>() {}
//             );
//             return response.getBody();

//         } catch (Exception e) {
//             throw new RuntimeException("Failed to fetch forecast: " + e.getMessage(), e);
//         }
//     }

//     // ----------------------------------------------------
//     // 3) BULK FORECAST  (POST /forecast/bulk)
//     // ----------------------------------------------------
//     public Map<String, Object> getBulkForecast(List<Long> productIds) {
//         String url = aiServiceUrl + API_PREFIX + "/forecast/bulk";

//         Map<String, Object> body = new HashMap<>();
//         if (productIds != null) {
//             body.put("product_ids", productIds);
//         }

//         try {
//             ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
//                     url,
//                     HttpMethod.POST,
//                     new org.springframework.http.HttpEntity<>(body),
//                     new ParameterizedTypeReference<Map<String, Object>>() {}
//             );

//             return response.getBody();

//         } catch (Exception e) {
//             throw new RuntimeException("Failed bulk forecast: " + e.getMessage(), e);
//         }
//     }

//     // ----------------------------------------------------
//     // 4) FORECAST SUMMARY (custom) - optional for UI
//     // ----------------------------------------------------
//     public Map<String, Object> getForecastSummary() {

//         Map<String, Object> summary = new HashMap<>();

//         try {
//             List<Map<String, Object>> riskList = getProductsAtRisk();

//             summary.put("total_at_risk", riskList.size());
//             summary.put("critical_count",
//                     riskList.stream().filter(m -> "CRITICAL".equals(m.get("risk_level"))).count());
//             summary.put("high_count",
//                     riskList.stream().filter(m -> "HIGH".equals(m.get("risk_level"))).count());
//             summary.put("status", "success");

//             return summary;

//         } catch (Exception e) {
//             throw new RuntimeException("Failed to fetch summary: " + e.getMessage(), e);
//         }
//     }

//     // ----------------------------------------------------
//     // 5) TEST AI SERVICE CONNECTION
//     // ----------------------------------------------------
//     public Map<String, Object> testConnection() {
//         String url = aiServiceUrl + "/health";

//         try {
//             ResponseEntity<Map<String, Object>> resp = restTemplate.exchange(
//                     url,
//                     HttpMethod.GET,
//                     null,
//                     new ParameterizedTypeReference<Map<String, Object>>() {}
//             );
//             return resp.getBody();

//         } catch (Exception e) {
//             Map<String, Object> error = new HashMap<>();
//             error.put("status", "fail");
//             error.put("error", e.getMessage());
//             return error;
//         }
//     }
// }




// backend/src/main/java/com/smartshelfx/service/AIForecastService.java

// package com.smartshelfx.service;

// import com.smartshelfx.dto.*;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.core.ParameterizedTypeReference;
// import org.springframework.http.HttpMethod;
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;

// import java.util.*;
// import java.util.stream.Collectors;

// @Service
// public class AIForecastService {

//     @Value("${ai.service.url:http://localhost:5000}")
//     private String aiServiceUrl;

//     private static final String API_PREFIX = "/api";

//     private final RestTemplate restTemplate;

//     public AIForecastService() {
//         this.restTemplate = new RestTemplate();
//     }

//     // ⭐ FIX: Return ForecastDTO instead of Map
//     public ForecastDTO getForecastForProduct(Long productId, Integer days) {
//         String url = aiServiceUrl + API_PREFIX + "/forecast/" + productId;
//         if (days != null) {
//             url += "?days=" + days;
//         }

//         System.out.println("🔍 Calling AI: " + url);

//         try {
//             ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
//                     url,
//                     HttpMethod.GET,
//                     null,
//                     new ParameterizedTypeReference<Map<String, Object>>() {}
//             );

//             Map<String, Object> data = response.getBody();
//             if (data == null) {
//                 throw new RuntimeException("No data received from AI service");
//             }

//             System.out.println("✅ AI Response received");

//             // Convert Map to ForecastDTO
//             return mapToForecastDTO(data);

//         } catch (Exception e) {
//             System.err.println("❌ AI Service Error: " + e.getMessage());
//             throw new RuntimeException("Failed to fetch forecast: " + e.getMessage(), e);
//         }
//     }

//     // ⭐ FIX: Return proper structure for at-risk products
//     public Map<String, Object> getProductsAtRisk() {
//         String url = aiServiceUrl + API_PREFIX + "/forecast/at-risk";

//         System.out.println("🔍 Calling AI: " + url);

//         try {
//             ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
//                     url,
//                     HttpMethod.GET,
//                     null,
//                     new ParameterizedTypeReference<List<Map<String, Object>>>() {}
//             );

//             List<Map<String, Object>> products = response.getBody();
//             if (products == null) {
//                 products = new ArrayList<>();
//             }

//             System.out.println("✅ Found " + products.size() + " products at risk");

//             // Wrap in expected structure
//             Map<String, Object> result = new HashMap<>();
//             result.put("products", products);
//             result.put("total", products.size());
//             result.put("status", "success");

//             return result;

//         } catch (Exception e) {
//             System.err.println("❌ AI Service Error: " + e.getMessage());
//             throw new RuntimeException("Failed to fetch at-risk products: " + e.getMessage(), e);
//         }
//     }

//     // ⭐ FIX: Return ForecastSummaryDTO
//     public ForecastSummaryDTO getForecastSummary() {
//         System.out.println("🔍 Generating forecast summary...");

//         try {
//             // Get all at-risk products
//             Map<String, Object> riskData = getProductsAtRisk();

//             @SuppressWarnings("unchecked")
//             List<Map<String, Object>> products =
//                 (List<Map<String, Object>>) riskData.get("products");

//             if (products == null) {
//                 products = new ArrayList<>();
//             }

//             // Calculate summary statistics
//             ForecastSummaryDTO summary = new ForecastSummaryDTO();

//             summary.setTotalProducts(products.size());
//             summary.setProductsAtRisk(products.size());

//             // Count by risk level
//             long critical = products.stream()
//                 .filter(p -> "CRITICAL".equals(p.get("risk_level")))
//                 .count();

//             long high = products.stream()
//                 .filter(p -> "HIGH".equals(p.get("risk_level")))
//                 .count();

//             long medium = products.stream()
//                 .filter(p -> "MEDIUM".equals(p.get("risk_level")))
//                 .count();

//             long low = products.stream()
//                 .filter(p -> "LOW".equals(p.get("risk_level")))
//                 .count();

//             summary.setCriticalRisk((int) critical);
//             summary.setHighRisk((int) high);
//             summary.setMediumRisk((int) medium);
//             summary.setLowRisk((int) low);

//             // Calculate average confidence
//             double avgConfidence = products.stream()
//                 .mapToDouble(p -> {
//                     Object conf = p.get("confidence_score");
//                     if (conf instanceof Number) {
//                         return ((Number) conf).doubleValue();
//                     }
//                     return 0.0;
//                 })
//                 .average()
//                 .orElse(0.0);

//             summary.setAvgConfidence(avgConfidence);

//             // Calculate total 7-day demand
//             int totalDemand = products.stream()
//                 .mapToInt(p -> {
//                     Object demand = p.get("predicted_demand_7days");
//                     if (demand instanceof Number) {
//                         return ((Number) demand).intValue();
//                     }
//                     return 0;
//                 })
//                 .sum();

//             summary.setTotalPredictedDemand7Days(totalDemand);

//             System.out.println("✅ Summary: " + products.size() + " products, " +
//                              critical + " critical, " + high + " high risk");

//             return summary;

//         } catch (Exception e) {
//             System.err.println("❌ Failed to generate summary: " + e.getMessage());
//             throw new RuntimeException("Failed to fetch summary: " + e.getMessage(), e);
//         }
//     }

//     // Helper: Convert Python response to ForecastDTO
//     private ForecastDTO mapToForecastDTO(Map<String, Object> data) {
//         ForecastDTO dto = new ForecastDTO();

//         dto.setProductId(getLongValue(data, "product_id"));
//         dto.setProductName((String) data.get("product_name"));
//         dto.setProductSku((String) data.get("product_sku"));
//         dto.setCurrentStock(getIntValue(data, "currentStock"));
//         dto.setReorderLevel(getIntValue(data, "reorderLevel"));
//         dto.setForecastGeneratedAt((String) data.get("forecast_generated_at"));
//         dto.setHistoricalDays(getIntValue(data, "historical_days"));
//         dto.setForecastDays(getIntValue(data, "forecast_days"));
//         dto.setConfidenceScore(getDoubleValue(data, "confidence_score"));

//         // Predictions
//         @SuppressWarnings("unchecked")
//         Map<String, Object> predictions = (Map<String, Object>) data.get("predictions");
//         if (predictions != null) {
//             PredictionsDTO pred = new PredictionsDTO();
//             pred.setNext7Days(getIntValue(predictions, "next_7_days"));
//             pred.setNext14Days(getIntValue(predictions, "next_14_days"));
//             pred.setNext30Days(getIntValue(predictions, "next_30_days"));

//             // Daily forecast
//             @SuppressWarnings("unchecked")
//             List<Map<String, Object>> dailyList =
//                 (List<Map<String, Object>>) predictions.get("daily_forecast");

//             if (dailyList != null) {
//                 List<DailyForecastDTO> daily = dailyList.stream()
//                     .map(d -> new DailyForecastDTO(
//                         (String) d.get("date"),
//                         getIntValue(d, "predicted_demand"),
//                         getDoubleValue(d, "confidence_score")
//                     ))
//                     .collect(Collectors.toList());
//                 pred.setDailyForecast(daily);
//             }

//             dto.setPredictions(pred);
//         }

//         // Risk Analysis
//         @SuppressWarnings("unchecked")
//         Map<String, Object> risk = (Map<String, Object>) data.get("risk_analysis");
//         if (risk != null) {
//             RiskAnalysisDTO riskDto = new RiskAnalysisDTO();
//             riskDto.setAtRisk((Boolean) risk.get("at_risk"));
//             riskDto.setRiskLevel((String) risk.get("risk_level"));
//             riskDto.setDaysUntilStockout(getIntValue(risk, "days_until_stockout"));
//             riskDto.setRecommendedOrderQuantity(getIntValue(risk, "recommended_order_quantity"));
//             dto.setRiskAnalysis(riskDto);
//         }

//         // Historical Summary
//         @SuppressWarnings("unchecked")
//         Map<String, Object> historical = (Map<String, Object>) data.get("historical_summary");
//         if (historical != null) {
//             HistoricalSummaryDTO histDto = new HistoricalSummaryDTO();
//             histDto.setAvgDailyDemand(getDoubleValue(historical, "avg_daily_demand"));
//             histDto.setMaxDailyDemand(getIntValue(historical, "max_daily_demand"));
//             histDto.setMinDailyDemand(getIntValue(historical, "min_daily_demand"));
//             histDto.setTotalDemand90Days(getIntValue(historical, "total_demand_90days"));
//             dto.setHistoricalSummary(histDto);
//         }

//         return dto;
//     }

//     // Helper methods for safe type conversion
//     private Integer getIntValue(Map<String, Object> map, String key) {
//         Object val = map.get(key);
//         if (val instanceof Number) {
//             return ((Number) val).intValue();
//         }
//         return 0;
//     }

//     private Long getLongValue(Map<String, Object> map, String key) {
//         Object val = map.get(key);
//         if (val instanceof Number) {
//             return ((Number) val).longValue();
//         }
//         return 0L;
//     }

//     private Double getDoubleValue(Map<String, Object> map, String key) {
//         Object val = map.get(key);
//         if (val instanceof Number) {
//             return ((Number) val).doubleValue();
//         }
//         return 0.0;
//     }

//     // Bulk forecast
//     public List<Map<String, Object>> getBulkForecast(List<Long> productIds) {
//         String url = aiServiceUrl + API_PREFIX + "/forecast/bulk";

//         Map<String, Object> body = new HashMap<>();
//         if (productIds != null) {
//             body.put("product_ids", productIds);
//         }

//         try {
//             ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
//                     url,
//                     HttpMethod.POST,
//                     new org.springframework.http.HttpEntity<>(body),
//                     new ParameterizedTypeReference<List<Map<String, Object>>>() {}
//             );

//             return response.getBody();

//         } catch (Exception e) {
//             throw new RuntimeException("Failed bulk forecast: " + e.getMessage(), e);
//         }
//     }

//     // Test connection
//     public Map<String, Object> testConnection() {
//         String url = aiServiceUrl + "/health";

//         try {
//             ResponseEntity<Map<String, Object>> resp = restTemplate.exchange(
//                     url,
//                     HttpMethod.GET,
//                     null,
//                     new ParameterizedTypeReference<Map<String, Object>>() {}
//             );
//             return resp.getBody();

//         } catch (Exception e) {
//             Map<String, Object> error = new HashMap<>();
//             error.put("status", "fail");
//             error.put("error", e.getMessage());
//             return error;
//         }
//     }
// }





// backend/src/main/java/com/smartshelfx/service/AIForecastService.java

package com.smartshelfx.service;

import com.smartshelfx.dto.*;
import com.smartshelfx.dto.ForecastDTO.*;  // ⭐ ADD THIS LINE - Import inner classes
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AIForecastService {

    @Value("${ai.service.url:http://localhost:5000}")
    private String aiServiceUrl;

    private static final String API_PREFIX = "/api";

    private final RestTemplate restTemplate;

    public AIForecastService() {
        this.restTemplate = new RestTemplate();
    }

    // ⭐ Return ForecastDTO instead of Map
    public ForecastDTO getForecastForProduct(Long productId, Integer days) {
        String url = aiServiceUrl + API_PREFIX + "/forecast/" + productId;
        if (days != null) {
            url += "?days=" + days;
        }

        System.out.println("🔍 Calling AI: " + url);

        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );

            Map<String, Object> data = response.getBody();
            if (data == null) {
                throw new RuntimeException("No data received from AI service");
            }

            System.out.println("✅ AI Response received");

            // Convert Map to ForecastDTO
            return mapToForecastDTO(data);

        } catch (Exception e) {
            System.err.println("❌ AI Service Error: " + e.getMessage());
            throw new RuntimeException("Failed to fetch forecast: " + e.getMessage(), e);
        }
    }

    // ⭐ Return proper structure for at-risk products
    public Map<String, Object> getProductsAtRisk() {
        String url = aiServiceUrl + API_PREFIX + "/forecast/at-risk";

        System.out.println("🔍 Calling AI: " + url);

        try {
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );

            List<Map<String, Object>> products = response.getBody();
            if (products == null) {
                products = new ArrayList<>();
            }

            System.out.println("✅ Found " + products.size() + " products at risk");

            // Wrap in expected structure
            Map<String, Object> result = new HashMap<>();
            result.put("products", products);
            result.put("total", products.size());
            result.put("status", "success");

            return result;

        } catch (Exception e) {
            System.err.println("❌ AI Service Error: " + e.getMessage());
            throw new RuntimeException("Failed to fetch at-risk products: " + e.getMessage(), e);
        }
    }

    // ⭐ Return ForecastSummaryDTO
    public ForecastSummaryDTO getForecastSummary() {
        System.out.println("🔍 Generating forecast summary...");

        try {
            // Get all at-risk products
            Map<String, Object> riskData = getProductsAtRisk();

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> products =
                (List<Map<String, Object>>) riskData.get("products");

            if (products == null) {
                products = new ArrayList<>();
            }

            // Calculate summary statistics
            ForecastSummaryDTO summary = new ForecastSummaryDTO();

            summary.setTotalProducts(products.size());
            summary.setProductsAtRisk(products.size());

            // Count by risk level
            long critical = products.stream()
                .filter(p -> "CRITICAL".equals(p.get("risk_level")))
                .count();

            long high = products.stream()
                .filter(p -> "HIGH".equals(p.get("risk_level")))
                .count();

            long medium = products.stream()
                .filter(p -> "MEDIUM".equals(p.get("risk_level")))
                .count();

            long low = products.stream()
                .filter(p -> "LOW".equals(p.get("risk_level")))
                .count();

            summary.setCriticalRisk((int) critical);
            summary.setHighRisk((int) high);
            summary.setMediumRisk((int) medium);
            summary.setLowRisk((int) low);

            // Calculate average confidence
            double avgConfidence = products.stream()
                .mapToDouble(p -> {
                    Object conf = p.get("confidence_score");
                    if (conf instanceof Number) {
                        return ((Number) conf).doubleValue();
                    }
                    return 0.0;
                })
                .average()
                .orElse(0.0);

            summary.setAvgConfidence(avgConfidence);

            // Calculate total 7-day demand
            int totalDemand = products.stream()
                .mapToInt(p -> {
                    Object demand = p.get("predicted_demand_7days");
                    if (demand instanceof Number) {
                        return ((Number) demand).intValue();
                    }
                    return 0;
                })
                .sum();

            summary.setTotalPredictedDemand7Days(totalDemand);

            System.out.println("✅ Summary: " + products.size() + " products, " +
                             critical + " critical, " + high + " high risk");

            return summary;

        } catch (Exception e) {
            System.err.println("❌ Failed to generate summary: " + e.getMessage());
            throw new RuntimeException("Failed to fetch summary: " + e.getMessage(), e);
        }
    }

    // Helper: Convert Python response to ForecastDTO
    private ForecastDTO mapToForecastDTO(Map<String, Object> data) {
        ForecastDTO dto = new ForecastDTO();

        dto.setProductId(getLongValue(data, "product_id"));
        dto.setProductName((String) data.get("product_name"));
        dto.setProductSku((String) data.get("product_sku"));
        dto.setCurrentStock(getIntValue(data, "currentStock"));
        dto.setReorderLevel(getIntValue(data, "reorderLevel"));
        dto.setForecastGeneratedAt((String) data.get("forecast_generated_at"));
        dto.setHistoricalDays(getIntValue(data, "historical_days"));
        dto.setForecastDays(getIntValue(data, "forecast_days"));
        dto.setConfidenceScore(getDoubleValue(data, "confidence_score"));

        // Predictions
        @SuppressWarnings("unchecked")
        Map<String, Object> predictions = (Map<String, Object>) data.get("predictions");
        if (predictions != null) {
            PredictionsDTO pred = new PredictionsDTO();  // Now works because of import
            pred.setNext7Days(getIntValue(predictions, "next_7_days"));
            pred.setNext14Days(getIntValue(predictions, "next_14_days"));
            pred.setNext30Days(getIntValue(predictions, "next_30_days"));

            // Daily forecast
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> dailyList =
                (List<Map<String, Object>>) predictions.get("daily_forecast");

            if (dailyList != null) {
                List<DailyForecastDTO> daily = dailyList.stream()  // Now works
                    .map(d -> new DailyForecastDTO(
                        (String) d.get("date"),
                        getIntValue(d, "predicted_demand"),
                        getDoubleValue(d, "confidence_score")
                    ))
                    .collect(Collectors.toList());
                pred.setDailyForecast(daily);
            }

            dto.setPredictions(pred);
        }

        // Risk Analysis
        @SuppressWarnings("unchecked")
        Map<String, Object> risk = (Map<String, Object>) data.get("risk_analysis");
        if (risk != null) {
            RiskAnalysisDTO riskDto = new RiskAnalysisDTO();  // Now works
            riskDto.setAtRisk((Boolean) risk.get("at_risk"));
            riskDto.setRiskLevel((String) risk.get("risk_level"));
            riskDto.setDaysUntilStockout(getIntValue(risk, "days_until_stockout"));
            riskDto.setRecommendedOrderQuantity(getIntValue(risk, "recommended_order_quantity"));
            dto.setRiskAnalysis(riskDto);
        }

        // Historical Summary
        @SuppressWarnings("unchecked")
        Map<String, Object> historical = (Map<String, Object>) data.get("historical_summary");
        if (historical != null) {
            HistoricalSummaryDTO histDto = new HistoricalSummaryDTO();  // Now works
            histDto.setAvgDailyDemand(getDoubleValue(historical, "avg_daily_demand"));
            histDto.setMaxDailyDemand(getIntValue(historical, "max_daily_demand"));
            histDto.setMinDailyDemand(getIntValue(historical, "min_daily_demand"));
            histDto.setTotalDemand90Days(getIntValue(historical, "total_demand_90days"));
            dto.setHistoricalSummary(histDto);
        }

        return dto;
    }

    // Helper methods for safe type conversion
    private Integer getIntValue(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val instanceof Number) {
            return ((Number) val).intValue();
        }
        return 0;
    }

    private Long getLongValue(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val instanceof Number) {
            return ((Number) val).longValue();
        }
        return 0L;
    }

    private Double getDoubleValue(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val instanceof Number) {
            return ((Number) val).doubleValue();
        }
        return 0.0;
    }

    // Bulk forecast
    public List<Map<String, Object>> getBulkForecast(List<Long> productIds) {
        String url = aiServiceUrl + API_PREFIX + "/forecast/bulk";

        Map<String, Object> body = new HashMap<>();
        if (productIds != null) {
            body.put("product_ids", productIds);
        }

        try {
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    new org.springframework.http.HttpEntity<>(body),
                    new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );

            return response.getBody();

        } catch (Exception e) {
            throw new RuntimeException("Failed bulk forecast: " + e.getMessage(), e);
        }
    }

    // Test connection
    public Map<String, Object> testConnection() {
        String url = aiServiceUrl + "/health";

        try {
            ResponseEntity<Map<String, Object>> resp = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return resp.getBody();

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "fail");
            error.put("error", e.getMessage());
            return error;
        }
    }
}