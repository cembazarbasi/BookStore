package com.example.bookstore.service.admin;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.example.bookstore.dto.BookDTO;
import com.example.bookstore.entities.Book;
import com.example.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book createBook(BookDTO bookDTO) throws IOException {
        Book book = new Book();
        book.setBook(bookDTO.getBook());
        book.setAuthor(bookDTO.getAuthor());
        book.setDescription(bookDTO.getDescription());
        book.setImg(bookDTO.getImg().getBytes());
        return bookRepository.save(book);
    }

    public List<Book> findBooksByAuthor(String author) {
        return bookRepository.findByAuthor(author);
    }

    @Override
    public List<Book> findAllByBooks() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> findBooksByBook(String book) {
        return bookRepository.findByBook(book);
    }

    @Override
    public void deleteBookById(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public Book updateBook(Long id, BookDTO bookDTO) throws IOException {
        Book existingBook = bookRepository.findById(id).orElse(null);
        existingBook.setBook(bookDTO.getBook());
        existingBook.setAuthor(bookDTO.getAuthor());
        existingBook.setDescription(bookDTO.getDescription());
        return bookRepository.save(existingBook);
    }
}
