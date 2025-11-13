package com.smartshelfx.repository;

import com.smartshelfx.model.Alert;
import com.smartshelfx.model.enums.AlertType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {

    List<Alert> findAllByOrderByCreatedAtDesc();

    List<Alert> findByIsReadFalseAndIsDismissedFalseOrderByCreatedAtDesc();

    List<Alert> findByIsDismissedFalseOrderByCreatedAtDesc();

    List<Alert> findByAlertTypeOrderByCreatedAtDesc(AlertType alertType);

    List<Alert> findBySeverityOrderByCreatedAtDesc(String severity);

    Long countByIsReadFalseAndIsDismissedFalse();

    boolean existsByProductIdAndAlertTypeAndIsDismissedFalse(Long productId, AlertType alertType);
}