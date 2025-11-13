package com.smartshelfx.service;

import com.smartshelfx.exception.BadRequestException;
import com.smartshelfx.model.Product;
import com.smartshelfx.model.User;
import com.smartshelfx.repository.ProductRepository;
import com.smartshelfx.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class CSVImportService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<Product> importProducts(MultipartFile file) {
        List<Product> products = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT
                     .withFirstRecordAsHeader()
                     .withIgnoreHeaderCase()
                     .withTrim())) {

            for (CSVRecord record : csvParser) {
                Product product = new Product();

                product.setSku(record.get("sku"));
                product.setName(record.get("name"));
                product.setCategory(record.get("category"));
                product.setCurrentStock(Integer.parseInt(record.get("current_stock")));
                product.setReorderLevel(Integer.parseInt(record.get("reorder_level")));
                product.setPrice(Double.parseDouble(record.get("price")));

                if (record.isMapped("description")) {
                    product.setDescription(record.get("description"));
                }

                // Check if SKU already exists
                if (!productRepository.existsBySku(product.getSku())) {
                    products.add(productRepository.save(product));
                }
            }

        } catch (Exception e) {
            throw new BadRequestException("Error importing CSV: " + e.getMessage());
        }

        return products;
    }
}