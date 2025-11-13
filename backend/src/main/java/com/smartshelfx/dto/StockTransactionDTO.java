package com.smartshelfx.dto;

import com.smartshelfx.model.enums.TransactionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockTransactionDTO {
    private Long id;

    @NotNull(message = "Product ID is required")
    private Long productId;

    private String productName;
    private String productSku;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;

    @NotNull(message = "Transaction type is required")
    private TransactionType type;

    private LocalDateTime timestamp;

    private Long handledById;
    private String handledByName;

    private String notes;
    private String referenceNumber;

    private Integer previousStock;
    private Integer newStock;
}