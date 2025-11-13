package com.smartshelfx.controller;

import com.smartshelfx.dto.AlertDTO;
import com.smartshelfx.model.enums.AlertType;
import com.smartshelfx.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AlertController {

    private final AlertService alertService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<List<AlertDTO>> getAllAlerts() {
        return ResponseEntity.ok(alertService.getAllAlerts());
    }

    @GetMapping("/unread")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<List<AlertDTO>> getUnreadAlerts() {
        return ResponseEntity.ok(alertService.getUnreadAlerts());
    }

    @GetMapping("/type/{type}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<List<AlertDTO>> getAlertsByType(@PathVariable AlertType type) {
        return ResponseEntity.ok(alertService.getAlertsByType(type));
    }

    @GetMapping("/severity/{severity}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<List<AlertDTO>> getAlertsBySeverity(@PathVariable String severity) {
        return ResponseEntity.ok(alertService.getAlertsBySeverity(severity));
    }

    @GetMapping("/count/unread")
    public ResponseEntity<Map<String, Long>> getUnreadCount() {
        return ResponseEntity.ok(Map.of("count", alertService.getUnreadCount()));
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<AlertDTO> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(alertService.markAsRead(id));
    }

    @PutMapping("/{id}/dismiss")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<AlertDTO> dismissAlert(@PathVariable Long id) {
        return ResponseEntity.ok(alertService.dismissAlert(id));
    }

    @PutMapping("/read-all")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Void> markAllAsRead() {
        alertService.markAllAsRead();
        return ResponseEntity.ok().build();
    }

    @PutMapping("/dismiss-all")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<Void> dismissAll() {
        alertService.dismissAll();
        return ResponseEntity.ok().build();
    }
}