package com.smartshelfx.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StockTransactionResponse {
    private String message;
    private StockTransactionDTO transaction;
    private Integer previousStock;
    private Integer newStock;
    private Boolean lowStockAlert;
}