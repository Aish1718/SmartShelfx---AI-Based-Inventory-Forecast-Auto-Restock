package com.smartshelfx.dto;

import com.smartshelfx.model.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class OrderStatusUpdateDTO {
    @NotNull(message = "Status is required")
    private OrderStatus status;

    private LocalDate actualDelivery;
    private String notes;
}