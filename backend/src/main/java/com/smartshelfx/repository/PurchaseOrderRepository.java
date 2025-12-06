package com.smartshelfx.repository;

import com.smartshelfx.model.PurchaseOrder;
import com.smartshelfx.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {

    List<PurchaseOrder> findByStatus(OrderStatus status);

    List<PurchaseOrder> findByVendorId(Long vendorId);

    List<PurchaseOrder> findByProductId(Long productId);

    List<PurchaseOrder> findByCreatedBy_Id(Long managerId);


    @Query("SELECT COUNT(po) FROM PurchaseOrder po WHERE po.status = :status")
    Long countByStatus(@Param("status") OrderStatus status);

    @Query("SELECT po FROM PurchaseOrder po WHERE po.status IN (:statuses) ORDER BY po.orderDate DESC")
    List<PurchaseOrder> findByStatusIn(@Param("statuses") List<OrderStatus> statuses);

    @Query("SELECT po FROM PurchaseOrder po ORDER BY po.orderDate DESC")
    List<PurchaseOrder> findAllOrderByOrderDateDesc();

    @Query("SELECT po FROM PurchaseOrder po WHERE po.orderDate BETWEEN :startDate AND :endDate ORDER BY po.orderDate DESC")
    List<PurchaseOrder> findByOrderDateBetween(@Param("startDate") LocalDateTime startDate,
                                               @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COUNT(po) FROM PurchaseOrder po WHERE po.product.id = :productId AND po.status IN ('PENDING', 'APPROVED', 'DISPATCHED')")
    Long countActiveOrdersByProduct(@Param("productId") Long productId);

    @Query("SELECT po FROM PurchaseOrder po WHERE po.isAiGenerated = true ORDER BY po.orderDate DESC")
    List<PurchaseOrder> findAiGeneratedOrders();

    @Query("SELECT po FROM PurchaseOrder po WHERE po.expectedDelivery < CURRENT_DATE AND po.status NOT IN ('DELIVERED', 'CANCELLED')")
    List<PurchaseOrder> findOverdueOrders();

    @Query("SELECT po FROM PurchaseOrder po WHERE po.vendor.id = :vendorId AND po.status = :status")
    List<PurchaseOrder> findByVendorIdAndStatus(@Param("vendorId") Long vendorId,
                                                @Param("status") OrderStatus status);


    @Query("SELECT COUNT(po) FROM PurchaseOrder po WHERE po.status IN :statuses")
    Long countByStatuses(@Param("statuses") List<OrderStatus> statuses);

}