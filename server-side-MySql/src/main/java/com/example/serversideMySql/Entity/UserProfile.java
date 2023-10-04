package com.example.serversideMySql.Entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "user_id") 
    private User user;

    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    
    private List<Blogs> blogs = new ArrayList<>();

    // Constructors, getters, setters, and other methods...

    // Define additional fields and methods as needed

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
}