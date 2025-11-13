package com.smartshelfx.service;

import com.smartshelfx.dto.AlertDTO;
import com.smartshelfx.model.Alert;
import com.smartshelfx.model.Product;
import com.smartshelfx.model.enums.AlertType;
import com.smartshelfx.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AlertRepository alertRepository;

    public List<AlertDTO> getAllAlerts() {
        return alertRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AlertDTO> getUnreadAlerts() {
        return alertRepository.findByIsReadFalseAndIsDismissedFalseOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AlertDTO> getAlertsByType(AlertType type) {
        return alertRepository.findByAlertTypeOrderByCreatedAtDesc(type)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AlertDTO> getAlertsBySeverity(String severity) {
        return alertRepository.findBySeverityOrderByCreatedAtDesc(severity)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public AlertDTO markAsRead(Long id) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alert not found"));
        alert.setIsRead(true);
        return convertToDTO(alertRepository.save(alert));
    }

    @Transactional
    public AlertDTO dismissAlert(Long id) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alert not found"));
        alert.setIsDismissed(true);
        alert.setDismissedAt(LocalDateTime.now());
        return convertToDTO(alertRepository.save(alert));
    }

    @Transactional
    public void markAllAsRead() {
        List<Alert> unreadAlerts = alertRepository.findByIsReadFalseAndIsDismissedFalseOrderByCreatedAtDesc();
        unreadAlerts.forEach(alert -> alert.setIsRead(true));
        alertRepository.saveAll(unreadAlerts);
    }

    @Transactional
    public void dismissAll() {
        List<Alert> activeAlerts = alertRepository.findByIsDismissedFalseOrderByCreatedAtDesc();
        activeAlerts.forEach(alert -> {
            alert.setIsDismissed(true);
            alert.setDismissedAt(LocalDateTime.now());
        });
        alertRepository.saveAll(activeAlerts);
    }

    @Transactional
    public void createLowStockAlert(Product product) {
        boolean alertExists = alertRepository.existsByProductIdAndAlertTypeAndIsDismissedFalse(
            product.getId(), AlertType.LOW_STOCK
        );

        if (!alertExists) {
            Alert alert = new Alert();
            alert.setProduct(product);
            alert.setAlertType(AlertType.LOW_STOCK);

            String severity;
            if (product.getCurrentStock() == 0) {
                severity = "CRITICAL";
                alert.setMessage(product.getName() + " is OUT OF STOCK!");
                alert.setAlertType(AlertType.OUT_OF_STOCK);
            } else if (product.getCurrentStock() < product.getReorderLevel() / 2) {
                severity = "HIGH";
                alert.setMessage(product.getName() + " stock is critically low (" +
                    product.getCurrentStock() + "/" + product.getReorderLevel() + ")");
            } else {
                severity = "MEDIUM";
                alert.setMessage(product.getName() + " stock is below reorder level (" +
                    product.getCurrentStock() + "/" + product.getReorderLevel() + ")");
            }

            alert.setSeverity(severity);
            alertRepository.save(alert);
        }
    }

    @Transactional
    public void createForecastAlert(Long productId, String productName, String message, String severity) {
        Alert alert = new Alert();
        alert.setProduct(new Product());
        alert.getProduct().setId(productId);
        alert.setAlertType(AlertType.FORECAST);
        alert.setMessage(message);
        alert.setSeverity(severity);
        alertRepository.save(alert);
    }

    public Long getUnreadCount() {
        return alertRepository.countByIsReadFalseAndIsDismissedFalse();
    }

    private AlertDTO convertToDTO(Alert alert) {
        AlertDTO dto = new AlertDTO();
        dto.setId(alert.getId());
        if (alert.getProduct() != null) {
            dto.setProductId(alert.getProduct().getId());
            dto.setProductName(alert.getProduct().getName());
            dto.setProductSku(alert.getProduct().getSku());
        }
        dto.setAlertType(alert.getAlertType());
        dto.setMessage(alert.getMessage());
        dto.setSeverity(alert.getSeverity());
        dto.setIsRead(alert.getIsRead());
        dto.setIsDismissed(alert.getIsDismissed());
        dto.setCreatedAt(alert.getCreatedAt());
        dto.setDismissedAt(alert.getDismissedAt());
        return dto;
    }
}