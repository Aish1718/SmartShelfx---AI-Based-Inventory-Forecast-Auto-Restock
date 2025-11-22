package com.smartshelfx.repository;

import com.smartshelfx.model.SalesRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesRepository extends JpaRepository<SalesRecord, Long> {

    // Buyer purchase history
    List<SalesRecord> findByBuyerId(Long buyerId);

    // Vendor sales history
    List<SalesRecord> findByVendorId(Long vendorId);

    // Vendor total revenue
    @Query("SELECT SUM(s.totalAmount) FROM SalesRecord s WHERE s.vendor.id = :vendorId")
    Double sumTotalAmountByVendorId(@Param("vendorId") Long vendorId);
}
