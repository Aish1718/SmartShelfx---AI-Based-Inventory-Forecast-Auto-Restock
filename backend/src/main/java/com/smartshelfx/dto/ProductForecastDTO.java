package com.smartshelfx.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductForecastDTO {
    private Long productId;
    private String productName;
    private String productSku;
    private Integer currentStock;
    private Integer predictedDemand7Days;
    private String riskLevel;
    private Boolean atRisk;
    private Double confidenceScore;
}