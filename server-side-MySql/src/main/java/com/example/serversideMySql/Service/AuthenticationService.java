package com.example.serversideMySql.Service;

public interface AuthenticationService {

    String login(String username, String password);

    boolean isAuthenticated();
}
