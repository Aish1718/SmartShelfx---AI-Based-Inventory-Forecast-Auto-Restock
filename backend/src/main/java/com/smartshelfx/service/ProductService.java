package com.smartshelfx.service;

import com.smartshelfx.dto.ProductDTO;
import com.smartshelfx.exception.BadRequestException;
import com.smartshelfx.exception.ResourceNotFoundException;
import com.smartshelfx.model.Product;
import com.smartshelfx.model.User;
import com.smartshelfx.repository.ProductRepository;
import com.smartshelfx.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CSVImportService csvImportService;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public Product getProductBySku(String sku) {
        return productRepository.findBySku(sku)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with SKU: " + sku));
    }

    @Transactional
    public Product createProduct(ProductDTO dto) {
        if (productRepository.existsBySku(dto.getSku())) {
            throw new BadRequestException("Product with SKU " + dto.getSku() + " already exists");
        }

        Product product = new Product();
        mapDtoToEntity(dto, product);

        return productRepository.save(product);
    }

    @Transactional
    public Product updateProduct(Long id, ProductDTO dto) {
        Product product = getProductById(id);

        if (!product.getSku().equals(dto.getSku()) && productRepository.existsBySku(dto.getSku())) {
            throw new BadRequestException("Product with SKU " + dto.getSku() + " already exists");
        }

        mapDtoToEntity(dto, product);

        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getLowStockProducts() {
        return productRepository.findLowStockProducts();
    }

    public List<String> getAllCategories() {
        return productRepository.findAllCategories();
    }

    @Transactional
    public List<Product> importFromCSV(MultipartFile file) {
        return csvImportService.importProducts(file);
    }

    @Transactional
    public void updateStock(Long productId, Integer quantity) {
        Product product = getProductById(productId);
        product.setCurrentStock(quantity);
        productRepository.save(product);
    }

    private void mapDtoToEntity(ProductDTO dto, Product product) {
        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setReorderLevel(dto.getReorderLevel());
        product.setCurrentStock(dto.getCurrentStock());
        product.setCategory(dto.getCategory());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());

        if (dto.getVendorId() != null) {
            User vendor = userRepository.findById(dto.getVendorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));
            product.setVendor(vendor);
        }
    }
}