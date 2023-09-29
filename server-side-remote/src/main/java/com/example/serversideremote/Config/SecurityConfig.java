package com.example.serversideremote.Config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.serversideremote.JWT.JwtAuthenticationEntryPoint;
import com.example.serversideremote.JWT.JwtAuthenticationFilter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {


    @Autowired
    private JwtAuthenticationEntryPoint point;
    @Autowired
    private JwtAuthenticationFilter filter;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new CustomAuthenticationSuccessHandler();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable())
        		.cors(cors->cors.disable())
                .authorizeHttpRequests(
                		auth->
                			  auth
                			  		.requestMatchers("/blogs/login").permitAll().requestMatchers("/blogs/create-user").permitAll()
                			  		.requestMatchers("/blogs/posts").permitAll()
                			  		.requestMatchers("/blogs/posts/{id}").permitAll()
                			  		.requestMatchers("/initialize-admin").hasRole("ADMIN")
                			  		.requestMatchers("/adminprofile").hasRole("ADMIN")
                			  		.anyRequest().permitAll())
                			  		
                .exceptionHandling(ex->ex.authenticationEntryPoint(point))
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
//        http.formLogin(formLogin -> formLogin
//                .loginPage("/blogs/login")
//                .loginProcessingUrl("/blogs/login")
//                .defaultSuccessUrl("/blogs/writeblog")
//        );
        http
        .formLogin(formLogin -> formLogin
            .defaultSuccessUrl("/blogs/writeblog") // Set your custom success handler here
        );
        return http.build(); 
    }
 
    @Bean
    public DaoAuthenticationProvider doDaoAuthenticationProvider() {
    	DaoAuthenticationProvider daoAuthentication=new DaoAuthenticationProvider();
    	daoAuthentication.setUserDetailsService(userDetailsService);
    	daoAuthentication.setPasswordEncoder(passwordEncoder);
    	return daoAuthentication;
    }
    
    private static class CustomAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
            // Check the user's role and redirect accordingly
            if (authentication.getAuthorities().stream().anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
                // User has the ROLE_ADMIN, redirect to adminprofile
                response.sendRedirect("blogs/adminprofile");
            } else {
                // User doesn't have ROLE_ADMIN, redirect to writeblog
                response.sendRedirect("/blogs/writeblog");
            }
        }
    }
	
}
//@Configuration
//public class SecurityConfig {
//
//    @Autowired
//    private JwtAuthenticationEntryPoint point;
//    @Autowired
//    private JwtAuthenticationFilter filter;
//    @Autowired
//    private UserDetailsService userDetailsService;
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Lazy
//    private CustomAuthenticationSuccessHandler authenticationSuccessHandler;
//
//    @Bean
//    public CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler() {
//        return new CustomAuthenticationSuccessHandler();
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        http.csrf(csrf -> csrf.disable())
//                .cors(cors->cors.disable())
//                .authorizeHttpRequests(
//                        auth ->
//                                auth
//                                        .requestMatchers("/blogs/login").permitAll().requestMatchers("/blogs/create-user").permitAll()
//                                        .requestMatchers("/blogs/posts").permitAll()
//                                        .requestMatchers("/blogs/posts/{id}").permitAll()
//                                        .requestMatchers("/initialize-admin").hasRole("ADMIN")
//                                        .requestMatchers("/adminprofile").hasRole("ADMIN")
//                                        .anyRequest().permitAll())
//                                        .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
//                                        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
////        http.formLogin(formLogin -> formLogin
////                .loginPage("/blogs/login")
////                .loginProcessingUrl("/blogs/login")
////                .defaultSuccessUrl("/blogs/writeblog")
////        );
//        http
//                .formLogin(formLogin -> formLogin
//                        .successHandler(authenticationSuccessHandler) // Set your custom success handler here
//                );
//        return http.build();
//    }
//
//    @Bean
//    public DaoAuthenticationProvider doDaoAuthenticationProvider() {
//        DaoAuthenticationProvider daoAuthentication=new DaoAuthenticationProvider();
//        daoAuthentication.setUserDetailsService(userDetailsService);
//        daoAuthentication.setPasswordEncoder(passwordEncoder);
//        return daoAuthentication;
//    }
//
//}







