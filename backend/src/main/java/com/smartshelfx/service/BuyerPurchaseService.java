package com.smartshelfx.service;

import com.smartshelfx.exception.BadRequestException;
import com.smartshelfx.model.*;
import com.smartshelfx.repository.*;
import com.smartshelfx.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuyerPurchaseService {

    private final SalesRepository salesRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    // Get logged-in buyer
    private User getCurrentBuyer() {
        UserPrincipal up = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return userRepo.findById(up.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Buy a product
    public SalesRecord purchaseProduct(Long productId, int qty) {

        User buyer = getCurrentBuyer();

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Stock check
        if (product.getCurrentStock() < qty) {
            throw new BadRequestException("Not enough stock");
        }

        // Update stock
        product.setCurrentStock(product.getCurrentStock() - qty);
        productRepo.save(product);

        SalesRecord record = new SalesRecord();
        record.setBuyer(buyer);
        record.setVendor(product.getVendor());
        record.setProduct(product);
        record.setQuantity(qty);
        record.setTotalAmount(product.getPrice() * qty);

        return salesRepo.save(record);
    }

    // Buyer purchase history
    public List<SalesRecord> getBuyerPurchases() {
        User buyer = getCurrentBuyer();
        return salesRepo.findByBuyerId(buyer.getId());
    }

    // Vendor sales overview
    public List<SalesRecord> getVendorSales(Long vendorId) {
        return salesRepo.findByVendorId(vendorId);
    }
}
