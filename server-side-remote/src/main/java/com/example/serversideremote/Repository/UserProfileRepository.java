package com.example.serversideremote.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.serversideremote.Entity.User;
import com.example.serversideremote.Entity.UserProfile;

@Repository
public interface UserProfileRepository extends MongoRepository<UserProfile, String> {

	Object findByUser(User user);
}
