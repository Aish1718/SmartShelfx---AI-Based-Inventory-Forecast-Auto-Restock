package com.smartshelfx.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {
    private String title;
    private List<String> labels;
    private List<Map<String, Object>> datasets;
    private Map<String, Object> metadata;
}