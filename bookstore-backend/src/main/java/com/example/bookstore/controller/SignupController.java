package com.example.bookstore.controller;

import com.example.bookstore.dto.SignupDTO;
import com.example.bookstore.dto.UserDTO;
import com.example.bookstore.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignupController {


    @Autowired
    private UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody SignupDTO signupDTO){

        if(userService.hasUserWithEmail(signupDTO.getEmail())){
            return new ResponseEntity<>("User already exist", HttpStatus.CONFLICT);
        }
        UserDTO createdUser = userService.createUser(signupDTO);
        if(createdUser == null){
            return new ResponseEntity<>("User not created. Please try again!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdUser,HttpStatus.CREATED);
    }
}
