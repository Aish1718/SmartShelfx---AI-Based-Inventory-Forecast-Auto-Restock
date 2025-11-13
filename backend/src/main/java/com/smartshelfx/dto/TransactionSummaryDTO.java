package com.smartshelfx.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionSummaryDTO {
    private Long totalTransactions;
    private Long stockInCount;
    private Long stockOutCount;
    private Integer totalStockIn;
    private Integer totalStockOut;
    private Long productCount;
}