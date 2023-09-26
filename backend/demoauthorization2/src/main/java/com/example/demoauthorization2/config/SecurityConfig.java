package com.example.demoauthorization2.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demoauthorization2.jwt.JwtAuthenticationEntryPoint;
import com.example.demoauthorization2.jwt.JwtAuthenticationFilter;

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
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable())
        		.cors(cors->cors.disable())
                .authorizeHttpRequests(
                		auth->
                			  auth
                			  		.requestMatchers("/blogs/login").permitAll().requestMatchers("/blogs/create-user").permitAll()
                			  		.requestMatchers("/blogs/posts").permitAll()
                			  		.requestMatchers("/blogs/posts/{id}").permitAll()
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


}