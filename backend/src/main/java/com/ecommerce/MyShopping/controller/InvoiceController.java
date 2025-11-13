package com.ecommerce.MyShopping.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.MyShopping.service.InvoiceService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/v1/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/{orderId}/pdf")
    @SecurityRequirement(name = "anil-shopping-api")
    public void downloadInvoicePdf(@PathVariable Long orderId, HttpServletResponse response) throws IOException {
        byte[] pdfBytes = invoiceService.generateInvoicePdf(orderId);

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "Attachment; filename=invoice_" + orderId + ".pdf");
        response.getOutputStream().write(pdfBytes);
        response.getOutputStream().flush();
    }

    @DeleteMapping("/{orderId}")
    @SecurityRequirement(name = "anil-shopping-api")
    public ResponseEntity<String> deleteInvoice(@PathVariable Long orderId) {
        invoiceService.deleteInvoice(orderId);
        return ResponseEntity.ok("Invoice deleted successfully");
    }

}
