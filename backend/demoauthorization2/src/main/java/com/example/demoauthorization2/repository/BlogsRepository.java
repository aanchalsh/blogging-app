package com.example.demoauthorization2.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demoauthorization2.entity.Blogs;
import com.example.demoauthorization2.entity.User;

public interface BlogsRepository extends MongoRepository<Blogs,String> {

	List<Blogs> findByTagsContaining(String tag);
	List<Blogs> findByTags(String tag);
	List<Blogs> findByAuthor(String author);
	List<Blogs> findByAuthorContaining(User user);


}
