package com.example.demoauthorization2.sevice;

public interface AuthenticationService {

    String login(String username, String password);

    boolean isAuthenticated();
}

