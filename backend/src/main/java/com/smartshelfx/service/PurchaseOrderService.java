package com.smartshelfx.service;

import com.smartshelfx.dto.*;
import com.smartshelfx.exception.BadRequestException;
import com.smartshelfx.exception.ResourceNotFoundException;
import com.smartshelfx.model.Product;
import com.smartshelfx.model.PurchaseOrder;
import com.smartshelfx.model.User;
import com.smartshelfx.model.enums.OrderStatus;
import com.smartshelfx.model.enums.Role;
import com.smartshelfx.repository.ProductRepository;
import com.smartshelfx.repository.PurchaseOrderRepository;
import com.smartshelfx.repository.UserRepository;
import com.smartshelfx.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseOrderService {

    private final PurchaseOrderRepository poRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final AIForecastService forecastService;

    @Transactional
    public PurchaseOrderDTO createPurchaseOrder(PurchaseOrderRequest request) {
        // Validate product
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Validate vendor
        User vendor = userRepository.findById(request.getVendorId())
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));

        if (vendor.getRole() != Role.VENDOR) {
            throw new BadRequestException("Selected user is not a vendor");
        }

        // Create purchase order
        PurchaseOrder po = new PurchaseOrder();
        po.setProduct(product);
        po.setVendor(vendor);
        po.setQuantity(request.getQuantity());
        po.setStatus(OrderStatus.PENDING);
        po.setOrderDate(LocalDateTime.now());
        po.setExpectedDelivery(request.getExpectedDelivery() != null ?
                               request.getExpectedDelivery() :
                               LocalDate.now().plusDays(7));
        po.setNotes(request.getNotes());
        po.setIsAiGenerated(request.getIsAiGenerated() != null ? request.getIsAiGenerated() : false);

        // Calculate total cost
        if (product.getPrice() != null) {
            po.setTotalCost(
                BigDecimal.valueOf(product.getPrice())
                    .multiply(BigDecimal.valueOf(request.getQuantity()))
            );
        }

        PurchaseOrder savedPO = poRepository.save(po);

        // Send email notification to vendor
        try {
            emailService.sendPurchaseOrderNotification(savedPO);
        } catch (Exception e) {
            // Log error but don't fail the transaction
            System.err.println("Failed to send email: " + e.getMessage());
        }

        return convertToDTO(savedPO);
    }

    public List<PurchaseOrderDTO> getAllPurchaseOrders() {
        return poRepository.findAllOrderByOrderDateDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PurchaseOrderDTO getPurchaseOrderById(Long id) {
        PurchaseOrder po = poRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase order not found"));
        return convertToDTO(po);
    }

    public List<PurchaseOrderDTO> getPurchaseOrdersByStatus(OrderStatus status) {
        return poRepository.findByStatus(status)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PurchaseOrderDTO> getPurchaseOrdersByVendor(Long vendorId) {
        return poRepository.findByVendorId(vendorId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PurchaseOrderDTO updateOrderStatus(Long id, OrderStatusUpdateDTO updateDTO) {
        PurchaseOrder po = poRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase order not found"));

        // Get current user
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        User currentUser = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        OrderStatus oldStatus = po.getStatus();
        po.setStatus(updateDTO.getStatus());

        if (updateDTO.getNotes() != null) {
            po.setNotes(updateDTO.getNotes());
        }

        // Handle status-specific logic
        switch (updateDTO.getStatus()) {
            case APPROVED:
                po.setApprovedBy(currentUser);
                po.setApprovedAt(LocalDateTime.now());
                break;

            case DELIVERED:
                po.setActualDelivery(updateDTO.getActualDelivery() != null ?
                                    updateDTO.getActualDelivery() :
                                    LocalDate.now());
                // Auto-create Stock IN transaction
                createStockInTransaction(po);
                break;

            case CANCELLED:
                // Nothing specific to do
                break;
        }

        PurchaseOrder updatedPO = poRepository.save(po);

        // Send status update email
        try {
            emailService.sendOrderStatusUpdate(updatedPO, oldStatus);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }

        return convertToDTO(updatedPO);
    }

    @Transactional
    public void deletePurchaseOrder(Long id) {
        PurchaseOrder po = poRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase order not found"));

        if (po.getStatus() != OrderStatus.PENDING && po.getStatus() != OrderStatus.CANCELLED) {
            throw new BadRequestException("Cannot delete order with status: " + po.getStatus());
        }

        poRepository.delete(po);
    }

    public List<RestockRecommendationDTO> getRestockRecommendations() {
        try {
            // Get forecast data from AI service
            var forecastResponse = forecastService.getProductsAtRisk();

            @SuppressWarnings("unchecked")
            List<java.util.Map<String, Object>> products =
                (List<java.util.Map<String, Object>>) forecastResponse.get("products");

            return products.stream().map(forecast -> {
                Long productId = ((Number) forecast.get("product_id")).longValue();

                // Check if there's already an active order
                Long activeOrders = poRepository.countActiveOrdersByProduct(productId);

                // Get vendor info
                Product product = productRepository.findById(productId).orElse(null);

                RestockRecommendationDTO recommendation = new RestockRecommendationDTO();
                recommendation.setProductId(productId);
                recommendation.setProductName((String) forecast.get("product_name"));
                recommendation.setProductSku((String) forecast.get("product_sku"));
                recommendation.setCurrentStock(((Number) forecast.get("current_stock")).intValue());
                recommendation.setPredictedDemand7Days(((Number) forecast.get("predicted_demand_7days")).intValue());
                recommendation.setRiskLevel((String) forecast.get("risk_level"));
                recommendation.setConfidenceScore(((Number) forecast.get("confidence_score")).doubleValue());
                recommendation.setHasActiveOrder(activeOrders > 0);

                if (product != null) {
                    recommendation.setReorderLevel(product.getReorderLevel());

                    // Calculate recommended quantity
                    int recommended = Math.max(
                        product.getReorderLevel() - product.getCurrentStock(),
                        recommendation.getPredictedDemand7Days()
                    );
                    recommendation.setRecommendedQuantity(recommended);

                    if (product.getVendor() != null) {
                        recommendation.setVendorId(product.getVendor().getId());
                        recommendation.setVendorName(product.getVendor().getName());
                        recommendation.setVendorEmail(product.getVendor().getEmail());
                    }

                    recommendation.setReason(buildReasonMessage(product, recommendation));
                }

                return recommendation;
            }).collect(Collectors.toList());

        } catch (Exception e) {
            throw new BadRequestException("Failed to get restock recommendations: " + e.getMessage());
        }
    }

    @Transactional
    public List<PurchaseOrderDTO> generateAutoRestockOrders() {
        List<RestockRecommendationDTO> recommendations = getRestockRecommendations();

        List<PurchaseOrderDTO> generatedOrders = recommendations.stream()
                .filter(rec -> !rec.getHasActiveOrder() && rec.getVendorId() != null)
                .filter(rec -> "CRITICAL".equals(rec.getRiskLevel()) || "HIGH".equals(rec.getRiskLevel()))
                .map(rec -> {
                    PurchaseOrderRequest request = new PurchaseOrderRequest();
                    request.setProductId(rec.getProductId());
                    request.setVendorId(rec.getVendorId());
                    request.setQuantity(rec.getRecommendedQuantity());
                    request.setExpectedDelivery(LocalDate.now().plusDays(7));
                    request.setNotes("AI-generated order based on forecast. " + rec.getReason());
                    request.setIsAiGenerated(true);

                    return createPurchaseOrder(request);
                })
                .collect(Collectors.toList());

        return generatedOrders;
    }

    private void createStockInTransaction(PurchaseOrder po) {
        // This would integrate with StockTransactionService
        // For now, just update the product stock directly
        Product product = po.getProduct();
        product.setCurrentStock(product.getCurrentStock() + po.getQuantity());
        productRepository.save(product);
    }

    private String buildReasonMessage(Product product, RestockRecommendationDTO rec) {
        StringBuilder reason = new StringBuilder();

        if (product.getCurrentStock() < product.getReorderLevel()) {
            reason.append("Stock below reorder level. ");
        }

        if (rec.getPredictedDemand7Days() > product.getCurrentStock()) {
            reason.append("Predicted demand exceeds current stock. ");
        }

        if ("CRITICAL".equals(rec.getRiskLevel())) {
            reason.append("Critical stockout risk!");
        }

        return reason.toString().trim();
    }

    private PurchaseOrderDTO convertToDTO(PurchaseOrder po) {
        PurchaseOrderDTO dto = new PurchaseOrderDTO();
        dto.setId(po.getId());
        dto.setProductId(po.getProduct().getId());
        dto.setProductName(po.getProduct().getName());
        dto.setProductSku(po.getProduct().getSku());
        dto.setVendorId(po.getVendor().getId());
        dto.setVendorName(po.getVendor().getName());
        dto.setVendorEmail(po.getVendor().getEmail());
        dto.setQuantity(po.getQuantity());
        dto.setStatus(po.getStatus());
        dto.setOrderDate(po.getOrderDate());
        dto.setExpectedDelivery(po.getExpectedDelivery());
        dto.setActualDelivery(po.getActualDelivery());
        dto.setNotes(po.getNotes());
        // dto.setTotalCost(po.getTotalCost());
        dto.setTotalCost(po.getTotalCost().doubleValue());
        dto.setIsAiGenerated(po.getIsAiGenerated());
        dto.setCreatedAt(po.getCreatedAt());

        if (po.getApprovedBy() != null) {
            dto.setApprovedById(po.getApprovedBy().getId());
            dto.setApprovedByName(po.getApprovedBy().getName());
            dto.setApprovedAt(po.getApprovedAt());
        }

        return dto;
    }
}