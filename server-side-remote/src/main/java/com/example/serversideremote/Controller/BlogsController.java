package com.example.serversideremote.Controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

import com.example.serversideremote.Entity.Blogs;
import com.example.serversideremote.Entity.User;
import com.example.serversideremote.Entity.UserProfile;
import com.example.serversideremote.Repository.BlogsRepository;
import com.example.serversideremote.Repository.UserProfileRepository;
import com.example.serversideremote.Repository.UserRepository;
import com.example.serversideremote.Service.UserService;
import com.mongodb.DBRef;

@RestController
@CrossOrigin(origins = "http://localhost:4200/blogs")
@RequestMapping("/blogs")
public class BlogsController {

	@Autowired
	private BlogsRepository blogRepository;
	private UserService userService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserProfileRepository userProfileRepository;

	public BlogsController(UserRepository userRepository2, UserProfileRepository userProfileRepository2,
			BlogsRepository blogRepository2) {
		// TODO Auto-generated constructor stub
	}

	@Autowired
	public void UserController(UserService userService) {
		this.userService = userService;
	}
	// @PreAuthorize("isAuthenticated()")

//	@PostMapping("/writeblog")
//	public ResponseEntity<UserProfile> createBlogPost(@RequestBody Blogs blog, Principal principal) {
//	    try {
//	        String username = principal.getName();
//	        User user = userRepository.findByUsername(username);
//	        System.out.print(user);
//
//	        if (user != null ) {
//	            UserProfile userProfile = user.getUserProfile();
//	            System.out.print(userProfile);
//
//	            if (userProfile == null) {
//	                userProfile = new UserProfile();
//	                userProfile.setUser(user);
//	            }
//	            Blogs savedBlog = blogRepository.save(blog);
//	            System.out.print(savedBlog);
//	            userProfile.getBlogs().add(savedBlog);
//	            UserProfile savedUserProfile = userProfileRepository.save(userProfile);
//	            user.setUserProfile(savedUserProfile);
//	            userRepository.save(user);
//
//	            return new ResponseEntity<>(savedUserProfile, HttpStatus.CREATED);
//	        } else {
//	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); 
//	        }
//	    } catch (Exception e) {
//	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//	    }
//	}
	@PreAuthorize("hasRole('USER')")
	@PostMapping("/writeblog")
	public ResponseEntity<UserProfile> createBlogPost(@RequestBody Blogs blog, Principal principal) {
		try {
			String username = principal.getName();
			User user = userRepository.findByUsername(username);

			if (user != null && user.isCanWriteBlog()) {
				UserProfile userProfile = user.getUserProfile();

				if (userProfile == null) {
					userProfile = new UserProfile();
					userProfile.setUser(user);
				}

				Blogs savedBlog = blogRepository.save(blog);
				userProfile.getBlogs().add(savedBlog);
				UserProfile savedUserProfile = userProfileRepository.save(userProfile);
				user.setUserProfile(savedUserProfile);
				userRepository.save(user);

				return new ResponseEntity<>(savedUserProfile, HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
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
	public ResponseEntity<Blogs> getBlogPostById(@PathVariable("id") Long id) {
		java.util.Optional<Blogs> blogData = blogRepository.findById(id);

		if (blogData.isPresent()) {
			return new ResponseEntity<>(blogData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/editblog/{id}")
	public ResponseEntity<Blogs> updateBlogPost(@PathVariable("id") String id, @RequestBody Blogs updatedBlog,
			Principal principal) {
		try {
			String username = principal.getName();
			User user = userRepository.findByUsername(username);

			if (user != null && user.isCanWriteBlog()) {
				Optional<Blogs> blogData = blogRepository.findById(id);

				if (blogData.isPresent()) {
					Blogs existingBlog = blogData.get();
					if (existingBlog.getAuthor().equals(username)) { 
						existingBlog.setTitle(updatedBlog.getTitle());
						existingBlog.setContent(updatedBlog.getContent());

						return new ResponseEntity<>(blogRepository.save(existingBlog), HttpStatus.OK);
					} else {
						return new ResponseEntity<>(HttpStatus.FORBIDDEN); 
					}
				} else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
				}
			} else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/deleteblog/{id}")
	public ResponseEntity<HttpStatus> deleteBlogPost(@PathVariable("id") String id, Principal principal) {
		try {
			String username = principal.getName();
			User user = userRepository.findByUsername(username);

			if (user != null) {
				Optional<Blogs> blogData = blogRepository.findById(id);

				if (blogData.isPresent()) {
					Blogs existingBlog = blogData.get();
					if (existingBlog.getAuthor().equals(username)) { 
						blogRepository.deleteById(id);
						return new ResponseEntity<>(HttpStatus.NO_CONTENT);
					} else {
						return new ResponseEntity<>(HttpStatus.FORBIDDEN); 
					}
				} else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			} else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST); 
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/tag/{tag}")
	public ResponseEntity<List<Blogs>> getBlogsByTag(@PathVariable String tag) {
		List<Blogs> blogs = blogRepository.findByTags(tag);
		return ResponseEntity.ok(blogs);
	}

	@GetMapping("/profile")
	public ResponseEntity<UserProfile> getUserProfile(@RequestParam(name = "author") String username) {
		try {
			User user = userRepository.findByUsername(username);

			if (user != null) {
				UserProfile userProfile = user.getUserProfile();

				if (userProfile == null) {
					userProfile = new UserProfile();
					userProfile.setUser(user);
				}

				List<Blogs> userBlogs = blogRepository.findByAuthor(username);

				userProfile.setBlogs(userBlogs);

				UserProfile savedUserProfile = userProfileRepository.save(userProfile);

				user.setUserProfile(savedUserProfile);
				userRepository.save(user);

				return new ResponseEntity<>(savedUserProfile, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/searchAuthor")
	public ResponseEntity<List<Blogs>> searchAuthor(@RequestParam("author") String author) {
		try {
			List<Blogs> blogsByAuthor = blogRepository.findByAuthor(author);
			if (blogsByAuthor.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>(blogsByAuthor, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/search")
	public ResponseEntity<List<Blogs>> searchBlogs(@RequestParam(name = "searchTerm") String searchTerm) {
		List<Blogs> matchingBlogs = new ArrayList<>();
		List<Blogs> allBlogs = blogRepository.findAll();
		String lowercaseSearchTerm = searchTerm.toLowerCase();
		for (Blogs blog : allBlogs) {
			String author = blog.getAuthor();
			if (author != null) {
				String lowercaseAuthor = author.toLowerCase();
				String lowercaseTitle = blog.getTitle().toLowerCase();
				List<String> lowercaseTags = blog.getTags().stream().map(String::toLowerCase)
						.collect(Collectors.toList());
				if (lowercaseAuthor.contains(lowercaseSearchTerm) || lowercaseTitle.contains(lowercaseSearchTerm)
						|| lowercaseTags.contains(lowercaseSearchTerm)) {
					matchingBlogs.add(blog);
				}
			}
		}
		return ResponseEntity.ok(matchingBlogs);
	}

}
