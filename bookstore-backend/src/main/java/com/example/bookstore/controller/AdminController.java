package com.example.bookstore.controller;

import com.example.bookstore.dto.BookDTO;
import com.example.bookstore.entities.Book;
import com.example.bookstore.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/newBook")
    public ResponseEntity<?> createBook(@ModelAttribute BookDTO bookDTO ) {
        try {
            Book createdBook = adminService.createBook(bookDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating book: " + e.getMessage());
        }
    }

    @GetMapping("/books")
    public ResponseEntity<?> getAllBooks() {
        try {
            List<Book> books = adminService.findAllByBooks();
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching books: " + e.getMessage());
        }
    }

    @GetMapping("/books/{book}")
    public ResponseEntity<?> getBooksByBook(@PathVariable String book) {
        try {
            List<Book> books = adminService.findBooksByBook(book);
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching books by book name: " + e.getMessage());
        }
    }

    @GetMapping("/author/{author}")
    public ResponseEntity<?> getBooksByAuthor(@PathVariable String author) {
        try {
            List<Book> books = adminService.findBooksByAuthor(author);
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching books by author: " + e.getMessage());
        }
    }

    @DeleteMapping("/books/delete/{id}")
    public ResponseEntity<?> deleteBookById(@PathVariable Long id) {
        try {
            adminService.deleteBookById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting book: " + e.getMessage());
        }
    }

    @PutMapping("/books/update/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody BookDTO bookDTO) {
        try {
            Book updatedBook = adminService.updateBook(id, bookDTO);
            return ResponseEntity.ok(updatedBook);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating book: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating book: " + e.getMessage());
        }
    }
}
