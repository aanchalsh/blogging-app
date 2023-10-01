package com.example.serversideremote.Controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.serversideremote.Entity.User;
import com.example.serversideremote.JWT.JwtHelper;
import com.example.serversideremote.JWT.JwtRequest;
import com.example.serversideremote.JWT.JwtResponse;
import com.example.serversideremote.Service.UserService;



@RestController
@CrossOrigin(origins = "http://localhost:4200/blogs")
@RequestMapping("/blogs")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;


    @Autowired
    private JwtHelper helper;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private UserService userService;




    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getUsername(), request.getPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = this.helper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .username(userDetails.getUsername()).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    private void doAuthenticate(String username, String password) {
//
//        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
//        try {
//            manager.authenticate(authentication);
//
//
//        } catch (BadCredentialsException e) {
//            throw new BadCredentialsException(" Invalid Username or Password  !!");
//        }
//
//    }
    
    private void doAuthenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
        try {
            Authentication result = manager.authenticate(authentication);
            // Authentication successful, you can log success if needed
            logger.info("Authentication successful for user: " + username);
        } catch (BadCredentialsException e) {
            // Authentication failed, log the error
            logger.error("Authentication failed for user: " + username, e);
            throw new BadCredentialsException("Invalid Username or Password !!");
        }
    }


    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }


    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        // Check if a user with the same username already exists
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT) // Return a 409 Conflict status code
                .body("{\"message\": \"User with the same username already exists\"}");
        }

        // If the username is unique, create the user
        User createdUser = userService.createUser(user);

        if (createdUser != null) {
            // User created successfully, return a success response
            return ResponseEntity.ok().body("{\"message\": \"User created successfully\"}");
        } else {
            // Handle the case where the user was not created (e.g., due to other validation)
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST) // Return a 400 Bad Request status code
                .body("{\"message\": \"Failed to create user\"}");
        }
    }

}


