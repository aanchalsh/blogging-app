package com.example.serversideremote.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.serversideremote.Entity.User;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
	 
	 User findByUsername(String username);
	 
	 boolean existsByUsername(String username);
}
