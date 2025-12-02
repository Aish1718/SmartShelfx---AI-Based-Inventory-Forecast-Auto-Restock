// // backend/src/main/java/com/smartshelfx/dto/ForecastDTO.java

// package com.smartshelfx.dto;

// import lombok.Data;
// import lombok.NoArgsConstructor;
// import lombok.AllArgsConstructor;
// import java.time.LocalDateTime;
// import java.util.List;
// import java.util.Map;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class ForecastDTO {
//     private Long productId;
//     private String productName;
//     private String productSku;
//     private Integer currentStock;
//     private Integer reorderLevel;
//     private String forecastGeneratedAt;
//     private Integer historicalDays;
//     private Integer forecastDays;
//     private Double confidenceScore;
//     private PredictionsDTO predictions;
//     private RiskAnalysisDTO riskAnalysis;
//     private HistoricalSummaryDTO historicalSummary;
// }

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// class PredictionsDTO {
//     private Integer next7Days;
//     private Integer next14Days;
//     private Integer next30Days;
//     private List<DailyForecastDTO> dailyForecast;
// }

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// class DailyForecastDTO {
//     private String date;
//     private Integer predictedDemand;
//     private Double confidenceScore;
// }

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// class RiskAnalysisDTO {
//     private Boolean atRisk;
//     private String riskLevel;
//     private Integer daysUntilStockout;
//     private Integer recommendedOrderQuantity;
// }

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// class HistoricalSummaryDTO {
//     private Double avgDailyDemand;
//     private Integer maxDailyDemand;
//     private Integer minDailyDemand;
//     private Integer totalDemand90Days;
// }



// backend/src/main/java/com/smartshelfx/dto/ForecastDTO.java

// backend/src/main/java/com/smartshelfx/dto/ForecastDTO.java

package com.smartshelfx.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForecastDTO {
    private Long productId;
    private String productName;
    private String productSku;
    private Integer currentStock;
    private Integer reorderLevel;
    private String forecastGeneratedAt;
    private Integer historicalDays;
    private Integer forecastDays;
    private Double confidenceScore;
    private PredictionsDTO predictions;
    private RiskAnalysisDTO riskAnalysis;
    private HistoricalSummaryDTO historicalSummary;

    // ⭐ Make these PUBLIC and STATIC so they can be used in AIForecastService
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PredictionsDTO {
        private Integer next7Days;
        private Integer next14Days;
        private Integer next30Days;
        private List<DailyForecastDTO> dailyForecast;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DailyForecastDTO {
        private String date;
        private Integer predictedDemand;
        private Double confidenceScore;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RiskAnalysisDTO {
        private Boolean atRisk;
        private String riskLevel;
        private Integer daysUntilStockout;
        private Integer recommendedOrderQuantity;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HistoricalSummaryDTO {
        private Double avgDailyDemand;
        private Integer maxDailyDemand;
        private Integer minDailyDemand;
        private Integer totalDemand90Days;
    }
}