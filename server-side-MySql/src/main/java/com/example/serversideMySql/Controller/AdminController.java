package com.example.serversideMySql.Controller;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.serversideMySql.Entity.User;

import com.example.serversideMySql.Repository.UserRepository;
import com.example.serversideMySql.Service.UserRole;


@RestController
@CrossOrigin(origins = "http://localhost:4200/blogs")
@RequestMapping("/blogs")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/initialize-admin")
    public ResponseEntity<?> initializeAdmin( ) {
        // Check if an admin user already exists
        if (userRepository.existsByUsername("admin")) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("{\"message\": \"Admin user already exists\"}");
        }

        // Create a new admin user
        User adminUser = new User();
        adminUser.setUsername("admin");
        adminUser.setPassword(passwordEncoder.encode("admin123")); // Encode the provided password
        adminUser.setRoles(Collections.singleton(UserRole.ROLE_ADMIN)); // Assign the ROLE_ADMIN role
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
    public ResponseEntity<?> updateCanWriteBlog(@RequestParam Long userId,
                                                @RequestParam boolean canWriteBlog) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        user.setCanWriteBlog(canWriteBlog);
        userRepository.save(user);

        return ResponseEntity.ok("canWriteBlog updated successfully");
    }

    
}


