package com.smartshelfx.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestockRecommendationDTO {
    private Long productId;
    private String productName;
    private String productSku;
    private Integer currentStock;
    private Integer reorderLevel;
    private Integer recommendedQuantity;
    private Integer predictedDemand7Days;
    private String riskLevel;
    private Double confidenceScore;
    private Long vendorId;
    private String vendorName;
    private String vendorEmail;
    private Boolean hasActiveOrder;
    private String reason;
}
