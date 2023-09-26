package com.example.serversideremote.Entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_profiles")
public class UserProfile {
    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Blogs> getBlogs() {
		return blogs;
	}

	public void setBlogs(List<Blogs> blogs) {
		this.blogs = blogs;
	}

	@Id
    private String id;
    
    @DBRef
    private User user;
    
    @DBRef
    private List<Blogs> blogs = new ArrayList<>();


}

