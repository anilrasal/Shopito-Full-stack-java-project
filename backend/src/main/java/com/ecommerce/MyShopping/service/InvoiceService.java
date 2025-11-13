package com.ecommerce.MyShopping.service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.MyShopping.model.Invoice;
import com.ecommerce.MyShopping.model.Order;
import com.ecommerce.MyShopping.model.OrderItem;
import com.ecommerce.MyShopping.repository.InvoiceRepository;
import com.ecommerce.MyShopping.repository.OrderRepository;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Invoice generateInvoice(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new IllegalStateException("No order found"));

        Invoice existingInvoice = invoiceRepository.findByOrderId(orderId);
        if (existingInvoice != null) {
            return existingInvoice; // Return existing invoice if it exists
        }

        Invoice invoice = new Invoice();
        invoice.setInvoiceNumber("INV-" + System.currentTimeMillis());
        invoice.setIssuedAt(LocalDateTime.now());
        invoice.setOrder(order);
        invoice.setTotalAmount(order.getTotal());
        invoice.setBillingAddress(order.getUser().getAddress());
        return invoiceRepository.save(invoice);
    }

    public byte[] generateInvoicePdf(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        Invoice invoice = generateInvoice(orderId);

        // Creating byte stream to generate the PDF document using in memory
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();

        PdfWriter.getInstance(document, out);
        document.open();
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

        document.add(new Paragraph("Invoice", headerFont));
        document.add(new Paragraph("Invoice No: " + invoice.getInvoiceNumber(), normalFont));
        document.add(new Paragraph("Issued At: " + invoice.getIssuedAt(), normalFont));
        document.add(new Paragraph("Customer: " + order.getUser().getName(), normalFont));
        document.add(new Paragraph("Billing address: " + invoice.getBillingAddress(), normalFont));
        document.add(new Paragraph("Total Amount: $" + invoice.getTotalAmount(), normalFont));
        document.add(new Paragraph(" ")); // Spacer

        PdfPTable table = new PdfPTable(4);
        table.addCell("Product");
        table.addCell("Quantity");
        table.addCell("Unit Price");
        table.addCell("Total");

        for (OrderItem item : order.getItems()) {
            table.addCell(item.getProduct().getName());
            table.addCell(String.valueOf(item.getQuantity()));
            table.addCell("$" + item.getProduct().getPrice());
            table.addCell("$" + item.getPrice());

        }
        document.add(table);

        document.add(new Paragraph(" ")); // Spacer

        // Adding a header table for invoice Summary
        PdfPTable headerTable = new PdfPTable(1);
        headerTable.setWidthPercentage(100); // span full page width

        PdfPCell headerCell = new PdfPCell(new Phrase("Invoice Summary", headerFont));
        headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        headerCell.setBorder(Rectangle.NO_BORDER);
        headerCell.setPaddingBottom(10);

        headerTable.addCell(headerCell);
        document.add(headerTable);

        // Adding total summary table
        PdfPTable summaryTable = new PdfPTable(2);
        summaryTable.addCell("Subtotal");
        summaryTable.addCell("$" + invoice.getTotalAmount());
        summaryTable.addCell("Delivery Charges");
        summaryTable.addCell("$0.00"); // Assuming no delivery charges for simplicity
        summaryTable.addCell("Total");
        summaryTable.addCell("$" + invoice.getTotalAmount());
        document.add(summaryTable);
        document.close();
        return out.toByteArray();
    }

    public void deleteInvoice(Long orderId) {
        Invoice invoice = invoiceRepository.findByOrderId(orderId);
        if (invoice != null) {
            invoiceRepository.delete(invoice);
        } else {
            throw new IllegalStateException("No invoice found for order ID: " + orderId);
        }
    }
}
