package com.smartshelfx.service;

import com.smartshelfx.model.PurchaseOrder;
import com.smartshelfx.model.enums.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendPurchaseOrderNotification(PurchaseOrder po) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(po.getVendor().getEmail());
        message.setSubject("New Purchase Order #" + po.getId() + " - SmartShelfX");
        message.setText(buildPurchaseOrderEmail(po));

        // Uncomment when email is configured
        // mailSender.send(message);

        // For now, just log
        System.out.println("Email would be sent to: " + po.getVendor().getEmail());
        System.out.println("Subject: " + message.getSubject());
        System.out.println("Body: " + message.getText());
    }

    public void sendOrderStatusUpdate(PurchaseOrder po, OrderStatus oldStatus) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(po.getVendor().getEmail());
        message.setSubject("Purchase Order #" + po.getId() + " Status Update - SmartShelfX");
        message.setText(buildStatusUpdateEmail(po, oldStatus));

        // Uncomment when email is configured
        // mailSender.send(message);

        System.out.println("Status update email would be sent to: " + po.getVendor().getEmail());
    }

    private String buildPurchaseOrderEmail(PurchaseOrder po) {
        return String.format(
            "Dear %s,\n\n" +
            "You have received a new purchase order from SmartShelfX.\n\n" +
            "Order Details:\n" +
            "Order ID: %d\n" +
            "Product: %s (SKU: %s)\n" +
            "Quantity: %d\n" +
            "Expected Delivery: %s\n" +
            "Total Cost: $%.2f\n\n" +
            "Notes: %s\n\n" +
            "Please log in to SmartShelfX to review and approve this order.\n\n" +
            "Best regards,\n" +
            "SmartShelfX Team",
            po.getVendor().getName(),
            po.getId(),
            po.getProduct().getName(),
            po.getProduct().getSku(),
            po.getQuantity(),
            po.getExpectedDelivery(),
            po.getTotalCost() != null ? po.getTotalCost() : 0.0,
            po.getNotes() != null ? po.getNotes() : "None"
        );
    }

    private String buildStatusUpdateEmail(PurchaseOrder po, OrderStatus oldStatus) {
        return String.format(
            "Dear %s,\n\n" +
            "Purchase Order #%d status has been updated.\n\n" +
            "Previous Status: %s\n" +
            "New Status: %s\n\n" +
            "Order Details:\n" +
            "Product: %s\n" +
            "Quantity: %d\n\n" +
            "Best regards,\n" +
            "SmartShelfX Team",
            po.getVendor().getName(),
            po.getId(),
            oldStatus,
            po.getStatus(),
            po.getProduct().getName(),
            po.getQuantity()
        );
    }
}