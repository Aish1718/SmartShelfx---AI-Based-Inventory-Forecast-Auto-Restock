package com.smartshelfx.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForecastResponse {
    private Long productId;
    private String productName;
    private Integer forecastDays;
    private Double confidenceScore;
    private List<Map<String, Object>> predictions;
    private Map<String, Object> summary;
}