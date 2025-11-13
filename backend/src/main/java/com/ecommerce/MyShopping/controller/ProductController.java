package com.ecommerce.MyShopping.controller;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.MyShopping.dto.ProductDTO;
import com.ecommerce.MyShopping.dto.ProductRequestDTO;
import com.ecommerce.MyShopping.model.Product;
import com.ecommerce.MyShopping.service.ProductService;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/v1/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

    // private final String basePhoneImagePath =
    // "http://localhost:8080/uploads/phones/";

    @PostMapping()
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.save(product));
    }

    @PostMapping(value = "/addWithImage", consumes = { "multipart/form-data" })
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<Product> addProductWithImage(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam int stock,
            @RequestParam BigDecimal price,
            @RequestParam String category,
            @RequestParam MultipartFile imageFile) {

        try {
            String contentType = imageFile.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new IllegalArgumentException("Only image files are allowed");
            }
            // Generate Unique filename
            String uniqueFileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();

            // Resolve absolute path.
            String uploadDir = new File("MyShopping/uploads/phones").getAbsolutePath();
            Path uploadPath = Paths.get(uploadDir);

            // Check if directory exists.
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            // Get the path of the file which is generated.
            Path filePath = uploadPath.resolve(uniqueFileName);

            // imageFile.transferTo(filePath.toFile());
            Files.copy(imageFile.getInputStream(), filePath,
                    StandardCopyOption.REPLACE_EXISTING);

            // Buid product object
            Product product = new Product();
            product.setName(name);
            product.setCategory(category);
            product.setDescription(description);
            product.setImageUrl("http://localhost:8080/uploads/phones/" + uniqueFileName);
            product.setInventory(stock);
            product.setPrice(price);

            return ResponseEntity.ok(productService.save(product));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(value = "/addWithImageData", consumes = { "multipart/form-data" })
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<Product> addProductWithImageData(
            @Parameter(description = "Product JSON", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductRequestDTO.class))) @RequestPart("product") ProductRequestDTO productRequestDTO,
            @RequestPart("imageFile") MultipartFile imageFile) {

        System.out.println("Received product: " + productRequestDTO);
        System.out.println("Received image: " + imageFile.getOriginalFilename());

        try {
            String contentType = imageFile.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new IllegalArgumentException("Only image files are allowed");
            }
            // Generate Unique filename
            String uniqueFileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();

            // Resolve absolute path.
            String uploadDir = new File("MyShopping/uploads/phones").getAbsolutePath();
            Path uploadPath = Paths.get(uploadDir);

            // Check if directory exists.
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            // Get the path of the file which is generated.
            Path filePath = uploadPath.resolve(uniqueFileName);

            // imageFile.transferTo(filePath.toFile());
            Files.copy(imageFile.getInputStream(), filePath,
                    StandardCopyOption.REPLACE_EXISTING);

            // Buid product object
            Product product = new Product();
            product.setName(productRequestDTO.getName());
            product.setCategory(productRequestDTO.getCategory());
            product.setDescription(productRequestDTO.getDescription());
            product.setImageUrl("http://localhost:8080/uploads/phones/" + uniqueFileName);
            product.setInventory(productRequestDTO.getAvailableStock());
            product.setPrice(productRequestDTO.getPrice());

            return ResponseEntity.ok(productService.save(product));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Enabled pagination to get the page as per the query from the front end.
    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getAllProducts(@ParameterObject Pageable pageable) {
        // Pageable This is to enable pagination
        // @ParameterObject is to inform swagger to treat
        // Pageable as query parameters, not a JSON body. So your Swagger UI will now
        // show: GET /products?page=0&size=10&sort=name,asc

        Page<ProductDTO> products = productService.findAll(pageable);
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // @PostMapping(value = "/upload", consumes =
    // MediaType.MULTIPART_FORM_DATA_VALUE)//
    // import org.springframework.http.MediaType; is required for this line

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<?> handleUpload(@RequestParam MultipartFile file) {
        String uploadDir = new File("MyShopping/uploads/users").getAbsolutePath();
        Path target = Paths.get(uploadDir, file.getOriginalFilename());
        try {
            file.transferTo(target);
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok("uploaded");
    }

    @PostMapping(value = "/upload-multiple", consumes = { "multipart/form-data" })
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<?> handleMultipleUpload(@RequestPart("files") MultipartFile files[]) {
        String uploadDir = new File("MyShopping/uploads/users").getAbsolutePath();
        for (MultipartFile file : files) {
            Path target = Paths.get(uploadDir, file.getOriginalFilename());
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }
            if (file.getSize() > 20971520) { // 20 MB limit
                return ResponseEntity.badRequest().body("File size exceeds limit of 10 MB");
            }
            try {
                file.transferTo(target);
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        }

        return ResponseEntity.ok("uploaded");
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> search(@RequestParam String q) {
        return ResponseEntity.ok(productService.searchProducts(q));
    }

    @DeleteMapping("/delete/{id}")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        try {
            Optional<Product> optionalProduct = productService.findById(id);
            if (optionalProduct.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Product product = optionalProduct.get();

            // Extract image filename from URL
            String imageUrl = product.getImageUrl(); // e.g., http://localhost:8080/uploads/phones/abc123_image.jpg
            String fileName = Paths.get(new URI(imageUrl).getPath()).getFileName().toString();

            // Build absolute path to image
            Path imagePath = Paths.get(new File("MyShopping/uploads/phones").getAbsolutePath(), fileName);

            // Delete image file if it exists
            if (Files.exists(imagePath)) {
                Files.delete(imagePath);
            }

            // Delete product from DB
            productService.deleteById(id);
            return ResponseEntity.ok("Success");

        } catch (IOException | URISyntaxException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/deleteWithoutImage/{id}")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<String> deleteWithoutImage(@PathVariable Long id) {
        try {
            Optional<Product> optionalProduct = productService.findById(id);
            if (optionalProduct.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            productService.deleteById(id);
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("");
        }
    }

    @PutMapping(value = "/update/{id}", consumes = "multipart/form-data")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<Product> updateProductWithImage(@PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Integer stock,
            @RequestParam(required = false) BigDecimal price,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) MultipartFile imageFile) {

        Optional<Product> optionalProduct = productService.findById(id);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        if (name != null)
            product.setName(name);

        if (category != null)
            product.setCategory(category);

        if (stock != 0 || stock != null)
            product.setInventory(stock);

        if (price != null)
            product.setPrice(price);

        if (description != null)
            product.setDescription(description);

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                // Delete old image
                String oldImageUrl = product.getImageUrl();
                if (oldImageUrl != null) {
                    String oldFileName = Paths.get(new URI(oldImageUrl).getPath()).getFileName().toString();
                    Path oldFilePath = Paths.get(new File("MyShopping/uploads/phones").getAbsolutePath(), oldFileName);
                    Files.deleteIfExists(oldFilePath);
                }

                // Save new image
                String uniqueFileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
                Path uploadPath = Paths.get(new File("MyShopping/uploads/phones/").getAbsolutePath());
                Files.createDirectories(uploadPath);

                Path filePath = uploadPath.resolve(uniqueFileName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                product.setImageUrl("http://localhost:8080/uploads/phones/" + uniqueFileName);

            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        return ResponseEntity.ok(productService.save(product));
    }

}
