package com.smartshelfx.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ProductDTO {
    private Long id;

    @NotBlank(message = "Product name is required")
    private String name;

    @NotBlank(message = "SKU is required")
    private String sku;

    private Long vendorId;

    @NotNull(message = "Reorder level is required")
    @Positive(message = "Reorder level must be positive")
    private Integer reorderLevel;

    @NotNull(message = "Current stock is required")
    private Integer currentStock;

    @NotBlank(message = "Category is required")
    private String category;

    @Positive(message = "Price must be positive")
    private Double price;

    private String description;

    private String imageUrl;
}