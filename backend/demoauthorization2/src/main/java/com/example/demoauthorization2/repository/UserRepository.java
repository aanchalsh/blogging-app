package com.example.demoauthorization2.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demoauthorization2.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
	 Optional<User> findByUsername(String username);
	 boolean existsByUsername(String username);
	 

}
