package com.smartshelfx.dto;

import com.smartshelfx.model.enums.AlertType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlertDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String productSku;
    private AlertType alertType;
    private String message;
    private String type;  // LOW_STOCK, EXPIRY, SYSTEM
    private String severity;
    private Boolean isRead;
    private Boolean isDismissed;
    private LocalDateTime createdAt;
    private LocalDateTime dismissedAt;
}