package com.example.serversideMySql.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.serversideMySql.Entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
	 
	 User findByUsername(String username);
	 
	 boolean existsByUsername(String username);
	 List<User> findAll();
}
