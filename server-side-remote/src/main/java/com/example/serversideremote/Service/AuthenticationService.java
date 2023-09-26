package com.example.serversideremote.Service;

public interface AuthenticationService {

    String login(String username, String password);

    boolean isAuthenticated();
}
