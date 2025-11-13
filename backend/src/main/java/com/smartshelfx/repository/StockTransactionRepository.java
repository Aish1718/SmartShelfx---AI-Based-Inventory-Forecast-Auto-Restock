package com.smartshelfx.repository;

import com.smartshelfx.model.StockTransaction;
import com.smartshelfx.model.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StockTransactionRepository extends JpaRepository<StockTransaction, Long> {

    List<StockTransaction> findByProductId(Long productId);

    List<StockTransaction> findByType(TransactionType type);

    List<StockTransaction> findByHandledById(Long userId);

    @Query("SELECT st FROM StockTransaction st ORDER BY st.timestamp DESC")
    List<StockTransaction> findAllOrderByTimestampDesc();

    @Query("SELECT st FROM StockTransaction st WHERE st.timestamp BETWEEN :startDate AND :endDate ORDER BY st.timestamp DESC")
    List<StockTransaction> findByDateRange(@Param("startDate") LocalDateTime startDate,
                                          @Param("endDate") LocalDateTime endDate);

    @Query("SELECT st FROM StockTransaction st WHERE st.product.id = :productId ORDER BY st.timestamp DESC")
    List<StockTransaction> findByProductIdOrderByTimestampDesc(@Param("productId") Long productId);

    @Query("SELECT COUNT(st) FROM StockTransaction st WHERE st.type = :type")
    Long countByType(@Param("type") TransactionType type);

    @Query("SELECT COALESCE(SUM(st.quantity), 0) FROM StockTransaction st WHERE st.type = :type")
    Integer sumQuantityByType(@Param("type") TransactionType type);

    @Query("SELECT COUNT(DISTINCT st.product.id) FROM StockTransaction st")
    Long countDistinctProducts();

    @Query("SELECT st FROM StockTransaction st WHERE DATE(st.timestamp) = CURRENT_DATE ORDER BY st.timestamp DESC")
    List<StockTransaction> findTodayTransactions();

    @Query("SELECT st FROM StockTransaction st WHERE st.product.category = :category ORDER BY st.timestamp DESC")
    List<StockTransaction> findByProductCategory(@Param("category") String category);
}