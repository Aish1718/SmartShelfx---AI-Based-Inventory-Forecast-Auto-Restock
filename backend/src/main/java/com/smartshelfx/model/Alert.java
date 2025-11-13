
package com.smartshelfx.model;

import com.smartshelfx.model.enums.AlertType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
@Data
@NoArgsConstructor
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Enumerated(EnumType.STRING)
    @Column(name = "alert_type", nullable = false)
    private AlertType alertType;

    @Column(nullable = false, length = 500)
    private String message;

    @Column(nullable = false)
    private String severity = "MEDIUM";

    @Column(name = "is_read")
    private Boolean isRead = false;

    @Column(name = "is_dismissed")
    private Boolean isDismissed = false;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "dismissed_at")
    private LocalDateTime dismissedAt;
}