package com.example.bookstore.repository;

import com.example.bookstore.entities.User;
import com.example.bookstore.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByEmail(String email);

    User findByUserRole(UserRole admin);
}
