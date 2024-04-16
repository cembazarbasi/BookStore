package com.example.bookstore.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BookDTO {

    private Long id;

    private String book;

    private String author;

    private String description;

    private MultipartFile img;
}
