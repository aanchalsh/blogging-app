package com.example.serversideMySql.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.serversideMySql.Entity.User;
import com.example.serversideMySql.Repository.UserRepository;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        // Check if a user with the same username already exists
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null) {
            // Handle the case where the user already exists, e.g., throw an exception or return null
            // Here, we'll return null as an example
            return null;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Collections.singleton(UserRole.ROLE_USER));
        

        // Save the user to the database
        return userRepository.save(user);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    public Optional<User> findUserWithBlogsByUsername(String username) {
        return userRepository.findByUsernameWithBlogs(username);
    }
}

