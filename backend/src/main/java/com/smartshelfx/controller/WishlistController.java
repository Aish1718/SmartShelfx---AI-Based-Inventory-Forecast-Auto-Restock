package com.smartshelfx.controller;

import com.smartshelfx.model.Wishlist;
import com.smartshelfx.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buyer")
@RequiredArgsConstructor
@CrossOrigin("*")
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/wishlist/{productId}")
    public ResponseEntity<Wishlist> addToWishlist(
            @PathVariable Long productId,
            @RequestParam Long buyerId
    ) {
        return ResponseEntity.ok(wishlistService.addToWishlist(buyerId, productId));
    }

    @GetMapping("/wishlist")
    public ResponseEntity<List<Wishlist>> getWishlist(
            @RequestParam Long buyerId
    ) {
        return ResponseEntity.ok(wishlistService.getWishlist(buyerId));
    }
}
