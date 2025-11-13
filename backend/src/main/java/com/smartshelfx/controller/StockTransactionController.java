package com.smartshelfx.controller;

import com.smartshelfx.dto.StockTransactionDTO;
import com.smartshelfx.dto.StockTransactionRequest;
import com.smartshelfx.dto.StockTransactionResponse;
import com.smartshelfx.dto.TransactionSummaryDTO;
import com.smartshelfx.service.StockTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StockTransactionController {

    private final StockTransactionService transactionService;

    // -------------------------------------------------------------
    // Create (IN / OUT)
    // -------------------------------------------------------------
    @PostMapping
    public ResponseEntity<StockTransactionResponse> processTransaction(
            @RequestBody StockTransactionRequest request
    ) {
        return ResponseEntity.ok(transactionService.processTransaction(request));
    }

    // -------------------------------------------------------------
    // Get all transactions
    // -------------------------------------------------------------
    @GetMapping
    public ResponseEntity<List<StockTransactionDTO>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    // -------------------------------------------------------------
    // Get by ID
    // -------------------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<StockTransactionDTO> getTransactionById(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

    // -------------------------------------------------------------
    // Filter by product
    // -------------------------------------------------------------
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<StockTransactionDTO>> getByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(transactionService.getTransactionsByProduct(productId));
    }

    // -------------------------------------------------------------
    // Filter by type (IN / OUT)
    // -------------------------------------------------------------
    @GetMapping("/type/{type}")
    public ResponseEntity<List<StockTransactionDTO>> getByType(@PathVariable String type) {
        return ResponseEntity.ok(transactionService.getTransactionsByType(
                Enum.valueOf(com.smartshelfx.model.enums.TransactionType.class, type.toUpperCase())
        ));
    }

    // -------------------------------------------------------------
    // Filter by date range
    // -------------------------------------------------------------
    @GetMapping("/range")
    public ResponseEntity<List<StockTransactionDTO>> getByDateRange(
            @RequestParam String start,
            @RequestParam String end
    ) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);

        return ResponseEntity.ok(transactionService.getTransactionsByDateRange(startDate, endDate));
    }

    // -------------------------------------------------------------
    // Today's transactions
    // -------------------------------------------------------------
    @GetMapping("/today")
    public ResponseEntity<List<StockTransactionDTO>> getTodayTransactions() {
        return ResponseEntity.ok(transactionService.getTodayTransactions());
    }

    // -------------------------------------------------------------
    // Summary (Dashboard Widget)
    // -------------------------------------------------------------
    @GetMapping("/summary")
    public ResponseEntity<TransactionSummaryDTO> getSummary() {
        return ResponseEntity.ok(transactionService.getTransactionSummary());
    }
}
