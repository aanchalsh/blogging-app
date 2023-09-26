package com.example.serversideremote.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.serversideremote.Entity.Blogs;
import com.example.serversideremote.Entity.User;


public interface BlogsRepository extends MongoRepository<Blogs,String> {

	List<Blogs> findByTagsContaining(String tag);
	List<Blogs> findByTags(String tag);
	List<Blogs> findByAuthor(String author);
	List<Blogs> findByAuthorContaining(User user);


}

