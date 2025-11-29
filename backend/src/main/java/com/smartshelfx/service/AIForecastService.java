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




package com.smartshelfx.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class AIForecastService {

    @Value("${ai.service.url:http://localhost:5000}")
    private String aiServiceUrl;

    private static final String API_PREFIX = "/api";

    private final RestTemplate restTemplate;

    public AIForecastService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Calls the AI service /forecast/at-risk endpoint
     * Returns a List of products at risk
     */
    public List<Map<String, Object>> getProductsAtRisk() {
        String url = aiServiceUrl + API_PREFIX + "/forecast/at-risk";

        System.out.println("🔍 Calling AI Service: " + url);

        try {
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );

            System.out.println("✅ AI Service Response: " + response.getStatusCode());
            return response.getBody();

        } catch (Exception e) {
            System.err.println("❌ AI Service Error: " + e.getMessage());
            throw new RuntimeException("Failed to fetch products at risk from AI service: " + e.getMessage(), e);
        }
    }

    /**
     * Get forecast for a single product
     */
    public Map<String, Object> getForecastForProduct(Long productId) {
        String url = aiServiceUrl + API_PREFIX + "/forecast/" + productId;

        System.out.println("🔍 Calling AI Service: " + url);

        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );

            System.out.println("✅ AI Service Response: " + response.getStatusCode());
            return response.getBody();

        } catch (Exception e) {
            System.err.println("❌ AI Service Error: " + e.getMessage());
            throw new RuntimeException("Failed to fetch forecast for product " + productId + ": " + e.getMessage(), e);
        }
    }
}