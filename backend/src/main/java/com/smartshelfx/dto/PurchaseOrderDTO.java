package com.smartshelfx.dto;

import com.smartshelfx.model.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrderDTO {
    private Long id;

    @NotNull(message = "Product ID is required")
    private Long productId;

    private String productName;
    private String productSku;

    @NotNull(message = "Vendor ID is required")
    private Long vendorId;

    private String vendorName;
    private String vendorEmail;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;

    private OrderStatus status;
    private LocalDateTime orderDate;
    private LocalDate expectedDelivery;
    private LocalDate actualDelivery;
    private String notes;
    private Double totalCost;
    private Boolean isAiGenerated;

    private Long approvedById;
    private String approvedByName;
    private LocalDateTime approvedAt;

    private LocalDateTime createdAt;
}