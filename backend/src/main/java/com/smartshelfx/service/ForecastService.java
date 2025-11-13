package com.smartshelfx.service;

import com.smartshelfx.dto.ForecastRequest;
import com.smartshelfx.dto.ForecastResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForecastService {

    private final AIForecastService aiForecastService;

    public ForecastResponse getForecast(ForecastRequest request) {
        // Delegate to AI service
        return new ForecastResponse();
    }
}