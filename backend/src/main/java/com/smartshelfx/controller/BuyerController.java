package com.smartshelfx.controller;

import com.smartshelfx.model.SalesRecord;
import com.smartshelfx.service.BuyerPurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/buyer")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BuyerController {

    private final BuyerPurchaseService purchaseService;

    // BUY PRODUCT
    @PostMapping("/purchase/{productId}")
    public Map<String, Object> purchaseProduct(
            @PathVariable Long productId,
            @RequestParam int quantity
    ) {
        SalesRecord record = purchaseService.purchaseProduct(productId, quantity);

        return Map.of(
                "message", "Purchase successful",
                "purchaseId", record.getId(),
                "totalAmount", record.getTotalAmount()
        );
    }

    // BUYER PURCHASE HISTORY
    @GetMapping("/purchases")
    public List<SalesRecord> getPurchases() {
        return purchaseService.getBuyerPurchases();
    }
}
