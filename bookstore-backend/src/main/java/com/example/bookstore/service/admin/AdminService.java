package com.example.bookstore.service.admin;

import com.example.bookstore.dto.BookDTO;
import com.example.bookstore.entities.Book;

import java.io.IOException;
import java.util.List;

public interface AdminService {

    Book createBook(BookDTO bookDTO) throws IOException;

    List<Book> findBooksByAuthor(String author);


    List<Book> findAllByBooks();

    List<Book> findBooksByBook(String book);

    void deleteBookById(Long id);

    Book updateBook(Long id, BookDTO bookDTO) throws IOException;
}
