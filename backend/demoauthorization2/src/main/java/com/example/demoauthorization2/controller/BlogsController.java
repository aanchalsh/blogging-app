package com.example.demoauthorization2.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demoauthorization2.entity.Blogs;
import com.example.demoauthorization2.repository.BlogsRepository;
import com.example.demoauthorization2.sevice.UserService;



@RestController
@CrossOrigin(origins = "http://localhost:4200/blogs")
@RequestMapping("/blogs")
public class BlogsController {
	
	@Autowired
    private BlogsRepository blogRepository;
	private UserService userService;
	
	

    @Autowired
    public void UserController(UserService userService) {
        this.userService = userService;
    }
    @PreAuthorize("isAuthenticated()")
	 @PostMapping("/writeblog")
	    public ResponseEntity<Blogs> createBlogPost(@RequestBody Blogs blog) {
	        try {
	            Blogs savedBlog = blogRepository.save(blog);
	            return new ResponseEntity<>(savedBlog, HttpStatus.CREATED);
	        } catch (Exception e) {
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	
	@GetMapping("/posts")
    public ResponseEntity<List<Blogs>> getAllBlogPosts() {
        try {
            List<Blogs> blogs = blogRepository.findAll();
            if (blogs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(blogs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@GetMapping("/posts/{id}")
    public ResponseEntity<Blogs> getBlogPostById(@PathVariable("id") String id) {
        java.util.Optional<Blogs> blogData = blogRepository.findById(id);

        if (blogData.isPresent()) {
            return new ResponseEntity<>(blogData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	@PutMapping("/editblog/{id}")
    public ResponseEntity<Blogs> updateBlogPost(@PathVariable("id") String id, @RequestBody Blogs blog) {
        java.util.Optional<Blogs> blogData = blogRepository.findById(id);

        if (blogData.isPresent()) {
            Blogs updatedBlog = blogData.get();
            updatedBlog.setTitle(blog.getTitle());
            updatedBlog.setContent(blog.getContent());

            return new ResponseEntity<>(blogRepository.save(updatedBlog), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteblog/{id}")
    public ResponseEntity<HttpStatus> deleteBlogPost(@PathVariable("id") String id) {
        try {
            blogRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//    @GetMapping("/searchByTag")
//    public List<Blogs> searchByTag(@RequestParam String tag) {
//        List<Blogs> matchingBlogs = blogRepository.findByTagsContaining(tag);
//        return matchingBlogs;
//    }
    @GetMapping("/tag/{tag}")
    public ResponseEntity<List<Blogs>> getBlogsByTag(@PathVariable String tag) {
        List<Blogs> blogs = blogRepository.findByTags(tag);
        return ResponseEntity.ok(blogs);
    }
    @GetMapping("/profile")
    public List<Blogs> searchByAuthor(@RequestParam String author) {
        List<Blogs> matchingBlogs = blogRepository.findByAuthorContaining(author);
        return matchingBlogs;
    }
    @GetMapping("/author")
    public List<Blogs> searchAuthor(@PathVariable String author) {
        List<Blogs> matchingBlogs = blogRepository.findByAuthorContaining(author);
        return matchingBlogs;
    }
    
//    @GetMapping("/users")
//    public List<User> getUser() {
//    	System.out.println("getting users");
//    	return this.userService.getUsers();
//    }
    @GetMapping("/current-user")
    public String getLoggedInUser(Principal principal) {
    	return principal.getName();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Blogs>> searchBlogs(
        @RequestParam(name = "searchTerm") String searchTerm
    ) {
        List<Blogs> matchingBlogs = new ArrayList<>();
        List<Blogs> allBlogs = blogRepository.findAll();
        // Convert the searchTerm to lowercase for case-insensitive search
        String lowercaseSearchTerm = searchTerm.toLowerCase();
        for (Blogs blog : allBlogs) {
            String lowercaseAuthor = blog.getAuthor().toLowerCase();
            String lowercaseTitle = blog.getTitle().toLowerCase();
            List<String> lowercaseTags = blog.getTags().stream()
                    .map(String::toLowerCase)
                    .collect(Collectors.toList());
            // Check if any of the fields (author, title, tags) contain the searchTerm
            if (lowercaseAuthor.contains(lowercaseSearchTerm)
                    || lowercaseTitle.contains(lowercaseSearchTerm)
                    || lowercaseTags.contains(lowercaseSearchTerm)) {
                matchingBlogs.add(blog);
            }
        }
        return ResponseEntity.ok(matchingBlogs);
    }
        

}

