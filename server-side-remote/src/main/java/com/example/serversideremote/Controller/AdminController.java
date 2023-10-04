package com.example.serversideremote.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.serversideremote.UserRole;
import com.example.serversideremote.Entity.User;
import com.example.serversideremote.JWT.JwtHelper;
import com.example.serversideremote.JWT.JwtRequest;
import com.example.serversideremote.JWT.JwtResponse;
import com.example.serversideremote.Repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200/blogs")
@RequestMapping("/blogs")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;
    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager manager;


    @Autowired
    private JwtHelper helper;

    @PostMapping("/adminlogin")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getUsername(), request.getPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = this.helper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .username(userDetails.getUsername()).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
        try {
            Authentication result = manager.authenticate(authentication);
            
            logger.info("Authentication successful for user: " + username);
        } catch (BadCredentialsException e) {
            
            logger.error("Authentication failed for user: " + username, e);
            throw new BadCredentialsException("Invalid Username or Password !!");
        }
    }

    @PostMapping("/initialize-admin")
    public ResponseEntity<?> initializeAdmin( @RequestParam String password) {
        if (userRepository.existsByUsername("admin")) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("{\"message\": \"Admin user already exists\"}");
        }
        User adminUser = new User();
        
        adminUser.setPassword(passwordEncoder.encode(password));
        adminUser.setRoles(Collections.singleton(UserRole.ROLE_ADMIN));
        userRepository.save(adminUser);

        return ResponseEntity.ok("{\"message\": \"Admin user created successfully\"}");
    }
    
    @GetMapping("/adminprofile")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminEndpoint() {
        return ResponseEntity.ok("Access granted to admin role.");
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<User>> listAllUsers() {
    	try {
    		List<User> users = userRepository.findAll();
    		List<User> filteredUsers = new ArrayList<>();

    		for (User user : users) {
    			if (!user.getUsername().equals("admin")) {
    				filteredUsers.add(user);
    			}
    		}

    		if (filteredUsers.isEmpty()) {
    			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    		}

    		return new ResponseEntity<>(filteredUsers, HttpStatus.OK);
    	} catch (Exception e) {
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/update-can-write-blog")
    public ResponseEntity<?> updateCanWriteBlog(@RequestParam String userId,
                                                @RequestParam boolean canWriteBlog) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        user.setCanWriteBlog(canWriteBlog);
        userRepository.save(user);

        return ResponseEntity.ok("{\"message\": \"canWriteBlog updated successfully\"}");
    }

    
}

