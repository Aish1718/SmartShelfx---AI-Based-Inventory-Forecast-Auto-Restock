package com.smartshelfx.service;

import com.smartshelfx.dto.*;
import com.smartshelfx.exception.BadRequestException;
import com.smartshelfx.exception.ResourceNotFoundException;
import com.smartshelfx.model.Product;
import com.smartshelfx.model.StockTransaction;
import com.smartshelfx.model.User;
import com.smartshelfx.model.enums.TransactionType;
import com.smartshelfx.repository.ProductRepository;
import com.smartshelfx.repository.StockTransactionRepository;
import com.smartshelfx.repository.UserRepository;
import com.smartshelfx.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockTransactionService {

    private final StockTransactionRepository transactionRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final AlertService alertService;

    @Transactional
    public StockTransactionResponse processTransaction(StockTransactionRequest request) {
        // Get product
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Get current user
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        User currentUser = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Store previous stock
        Integer previousStock = product.getCurrentStock();
        Integer newStock;

        // Validate and calculate new stock
        if (request.getType() == TransactionType.IN) {
            newStock = previousStock + request.getQuantity();
        } else { // TransactionType.OUT
            if (previousStock < request.getQuantity()) {
                throw new BadRequestException(
                    "Insufficient stock. Available: " + previousStock + ", Requested: " + request.getQuantity()
                );
            }
            newStock = previousStock - request.getQuantity();
        }

        // Update product stock
        product.setCurrentStock(newStock);
        productRepository.save(product);

        // Create transaction record
        StockTransaction transaction = new StockTransaction();
        transaction.setProduct(product);
        transaction.setQuantity(request.getQuantity());
        transaction.setType(request.getType());
        transaction.setHandledBy(currentUser);
        transaction.setNotes(request.getNotes());
        transaction.setReferenceNumber(request.getReferenceNumber());
        transaction.setPreviousStock(previousStock);
        transaction.setNewStock(newStock);

        StockTransaction savedTransaction = transactionRepository.save(transaction);

        // Check for low stock and create alert if needed
        boolean lowStockAlert = false;
        if (newStock < product.getReorderLevel()) {
            alertService.createLowStockAlert(product);
            lowStockAlert = true;
        }

        // Convert to DTO
        StockTransactionDTO dto = convertToDTO(savedTransaction);

        String message = request.getType() == TransactionType.IN
            ? "Stock added successfully"
            : "Stock removed successfully";

        return new StockTransactionResponse(message, dto, previousStock, newStock, lowStockAlert);
    }

    public List<StockTransactionDTO> getAllTransactions() {
        return transactionRepository.findAllOrderByTimestampDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public StockTransactionDTO getTransactionById(Long id) {
        StockTransaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
        return convertToDTO(transaction);
    }

    public List<StockTransactionDTO> getTransactionsByProduct(Long productId) {
        return transactionRepository.findByProductIdOrderByTimestampDesc(productId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<StockTransactionDTO> getTransactionsByType(TransactionType type) {
        return transactionRepository.findByType(type)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<StockTransactionDTO> getTransactionsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return transactionRepository.findByDateRange(startDate, endDate)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<StockTransactionDTO> getTodayTransactions() {
        return transactionRepository.findTodayTransactions()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TransactionSummaryDTO getTransactionSummary() {
        TransactionSummaryDTO summary = new TransactionSummaryDTO();
        summary.setTotalTransactions(transactionRepository.count());
        summary.setStockInCount(transactionRepository.countByType(TransactionType.IN));
        summary.setStockOutCount(transactionRepository.countByType(TransactionType.OUT));
        summary.setTotalStockIn(transactionRepository.sumQuantityByType(TransactionType.IN));
        summary.setTotalStockOut(transactionRepository.sumQuantityByType(TransactionType.OUT));
        summary.setProductCount(transactionRepository.countDistinctProducts());
        return summary;
    }

    private StockTransactionDTO convertToDTO(StockTransaction transaction) {
        StockTransactionDTO dto = new StockTransactionDTO();
        dto.setId(transaction.getId());
        dto.setProductId(transaction.getProduct().getId());
        dto.setProductName(transaction.getProduct().getName());
        dto.setProductSku(transaction.getProduct().getSku());
        dto.setQuantity(transaction.getQuantity());
        dto.setType(transaction.getType());
        dto.setTimestamp(transaction.getTimestamp());
        dto.setNotes(transaction.getNotes());
        dto.setReferenceNumber(transaction.getReferenceNumber());
        dto.setPreviousStock(transaction.getPreviousStock());
        dto.setNewStock(transaction.getNewStock());

        if (transaction.getHandledBy() != null) {
            dto.setHandledById(transaction.getHandledBy().getId());
            dto.setHandledByName(transaction.getHandledBy().getName());
        }

        return dto;
    }
}