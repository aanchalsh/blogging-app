package com.example.demoauthorization2.sevice;

//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.example.demoauthorization2.entity.User;
//import com.example.demoauthorization2.repository.UserRepository;
//
//
//
//@Service
//public class UserService {
//	@Autowired
//	private UserRepository userRepository;
//	
//	@Autowired
//	private PasswordEncoder passwordEncoder;
//	
//	public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//	
//	public List<User> getUsers() {
//        return userRepository.findAll();
//    }	
//	public User createUser(User user) {
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
//		return userRepository.save(user);
//	}
//
//	public User findByUsername(String username) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	
//	
//	
//
//}
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.example.demoauthorization2.entity.User;
//import com.example.demoauthorization2.repository.UserRepository;
//
//
//
//@Service
//public class UserService {
//	@Autowired
//	private UserRepository userRepository;
//	
//	@Autowired
//	private PasswordEncoder passwordEncoder;
//	
//	public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//	
//	public List<User> getUsers() {
//        return userRepository.findAll();
//    }	
////	public User createUser(User user) {
////		user.setPassword(passwordEncoder.encode(user.getPassword()));
////		return userRepository.save(user);
////	}
//	public User createUser(User user) {
//        // Check if a user with the same username already exists
//        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
//        if (existingUser.isPresent()) {
//            // Handle the case where the user already exists, e.g., throw an exception or return null
//            // Here, we'll return null as an example
//            return null;
//        }
//
//        // Encode the user's password before saving it to the database
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        // Save the user to the database
//        return userRepository.save(user);
//    }
//
//
//}
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.example.demoauthorization2.entity.User;
import com.example.demoauthorization2.repository.UserRepository;

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
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return null;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

	
}
