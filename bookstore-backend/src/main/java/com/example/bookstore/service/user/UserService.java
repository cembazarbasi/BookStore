package com.example.bookstore.service.user;

import com.example.bookstore.dto.SignupDTO;
import com.example.bookstore.dto.UserDTO;

public interface UserService {
    UserDTO createUser(SignupDTO signupDTO);

    boolean hasUserWithEmail(String email);
}
