package com.smartshelfx.service;

import com.smartshelfx.exception.BadRequestException;
import com.smartshelfx.model.Product;
import com.smartshelfx.model.User;
import com.smartshelfx.model.Wishlist;
import com.smartshelfx.repository.ProductRepository;
import com.smartshelfx.repository.UserRepository;
import com.smartshelfx.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public Wishlist addToWishlist(Long buyerId, Long productId) {

        if (wishlistRepository.existsByBuyerIdAndProductId(buyerId, productId)) {
            throw new BadRequestException("Already added to wishlist");
        }

        User buyer = userRepository.findById(buyerId)
                .orElseThrow(() -> new BadRequestException("Buyer not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BadRequestException("Product not found"));

        Wishlist wishlist = new Wishlist();
        wishlist.setBuyer(buyer);
        wishlist.setProduct(product);

        return wishlistRepository.save(wishlist);
    }

    public List<Wishlist> getWishlist(Long buyerId) {
        return wishlistRepository.findByBuyerId(buyerId);
    }
}