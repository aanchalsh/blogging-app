package com.example.demoauthorization2.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demoauthorization2.entity.Blogs;

public interface BlogsRepository extends MongoRepository<Blogs,String> {

	List<Blogs> findByTagsContaining(String tag);
	List<Blogs> findByAuthorContaining(String author);
	List<Blogs> findByTags(String tag);

}
