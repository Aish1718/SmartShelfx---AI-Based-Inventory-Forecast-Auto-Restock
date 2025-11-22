package com.smartshelfx.repository;

import com.smartshelfx.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    List<Wishlist> findByBuyerId(Long buyerId);

    boolean existsByBuyerIdAndProductId(Long buyerId, Long productId);
}