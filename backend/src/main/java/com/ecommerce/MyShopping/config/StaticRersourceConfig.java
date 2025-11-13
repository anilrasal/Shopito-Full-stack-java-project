// package com.ecommerce.MyShopping.config;

// import java.io.File;

// import org.springframework.context.annotation.Configuration;
// import
// org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class StaticRersourceConfig implements WebMvcConfigurer {

// // This class can be used to configure static resource handling if needed.
// // For example, you can override methods to customize the resource handlers.

// // Uncomment and implement methods as needed:
// // @Override
// // public void addResourceHandlers(ResourceHandlerRegistry registry) {
// // registry.addResourceHandler("/static/**")
// // .addResourceLocations("classpath:/static/");
// // }

// @Override
// public void addResourceHandlers(ResourceHandlerRegistry registry) {
// registry.addResourceHandler("/images/**")
// .addResourceLocations("file:./images/products/");
// System.out.println(new
// File("./images/products/keyboard.jpg").getAbsolutePath());
// }

// }
