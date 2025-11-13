package com.smartshelfx.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.time.LocalDate;

@Data
public class PurchaseOrderRequest {
    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotNull(message = "Vendor ID is required")
    private Long vendorId;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;

    private LocalDate expectedDelivery;
    private String notes;
    private Boolean isAiGenerated;
}
