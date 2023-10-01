package com.example.serversideMySql.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.serversideMySql.Entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
	 
	 User findByUsername(String username);
	 
	 boolean existsByUsername(String username);
	 List<User> findAll();

	Optional<User> findById(Long userId);
	@Query("SELECT u FROM User u LEFT JOIN FETCH u.userProfile up LEFT JOIN FETCH up.blogs WHERE u.username = :username")
    Optional<User> findByUsernameWithBlogs(@Param("username") String username);
}
