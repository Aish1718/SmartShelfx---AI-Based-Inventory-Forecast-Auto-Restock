// backend/src/main/java/com/smartshelfx/dto/ForecastSummaryDTO.java

package com.smartshelfx.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForecastSummaryDTO {
    private Integer totalProducts;
    private Integer productsAtRisk;
    private Integer criticalRisk;
    private Integer highRisk;
    private Integer mediumRisk;
    private Integer lowRisk;
    private Double avgConfidence;
    private Integer totalPredictedDemand7Days;
}