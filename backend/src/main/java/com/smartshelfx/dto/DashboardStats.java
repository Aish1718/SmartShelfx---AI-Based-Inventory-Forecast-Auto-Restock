package com.smartshelfx.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private Long totalProducts;
    private Long lowStockCount;
    private Long pendingOrders;
    private Double totalValue;
}
