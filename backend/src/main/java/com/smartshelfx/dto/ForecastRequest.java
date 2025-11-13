package com.smartshelfx.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForecastRequest {
    private Long productId;
    private Integer forecastDays;
    private List<Long> productIds; // For bulk forecast
}