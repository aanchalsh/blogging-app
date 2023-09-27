package com.example.serversideMySql.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.serversideMySql.Entity.UserProfile;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, String> {
}

