package com.smartshelfx.model.enums;

public enum OrderStatus {
    PENDING,      // Order created, awaiting approval
    APPROVED,     // Vendor approved the order
    DISPATCHED,   // Order shipped by vendor
    DELIVERED,    // Order received
    RECEIVED,
    CANCELLED     // Order cancelled
}