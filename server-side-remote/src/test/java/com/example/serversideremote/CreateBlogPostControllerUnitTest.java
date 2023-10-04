package com.example.serversideremote;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.serversideremote.Controller.BlogsController;
import com.example.serversideremote.Entity.Blogs;
import com.example.serversideremote.Entity.User;
import com.example.serversideremote.Entity.UserProfile;
import com.example.serversideremote.Repository.BlogsRepository;
import com.example.serversideremote.Repository.UserProfileRepository;
import com.example.serversideremote.Repository.UserRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.security.Principal;

@ExtendWith(MockitoExtension.class)
class CreateBlogPostControllerUnitTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserProfileRepository userProfileRepository;

    @Mock
    private BlogsRepository blogRepository;

    @Test
    public void createBlogPost_userCanWriteBlog_shouldReturnCreatedResponse() {
        
        String username = "Varsha";
        User user = new User();
        user.setUsername(username);
        user.setCanWriteBlog(true);

        UserProfile userProfile = new UserProfile();
        userProfile.setUser(user);

        Blogs blog = new Blogs();

        
        when(userRepository.findByUsername(username)).thenReturn(user);
        when(userProfileRepository.findByUser(user)).thenReturn(userProfile);
        when(blogRepository.save(blog)).thenReturn(blog);

        BlogsController controller = new BlogsController(userRepository, userProfileRepository, blogRepository);
        ResponseEntity<UserProfile> response = controller.createBlogPost(blog, new Principal() {
            @Override
            public String getName() {
                return username;
            }
        });

        
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(userProfile, response.getBody());
    }

    @Test
    public void createBlogPost_userCannotWriteBlog_shouldReturnForbiddenResponse() {
        
        String username = "Varsha";
        User user = new User();
        user.setUsername(username);
        user.setCanWriteBlog(false);

        BlogsController controller = new BlogsController(userRepository, userProfileRepository, blogRepository);
        ResponseEntity<UserProfile> response = controller.createBlogPost(new Blogs(), new Principal() {
            @Override
            public String getName() {
                return username;
            }
        });

       
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }
}

