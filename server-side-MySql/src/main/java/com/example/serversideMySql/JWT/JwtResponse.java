package com.example.serversideMySql.JWT;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class JwtResponse {
    private String jwtToken;
    private String username;
    private String email;

    // Getter and setter methods for jwtToken and username

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public static JwtResponseBuilder builder() {
        return new JwtResponseBuilder();
    }

    public static class JwtResponseBuilder {
        private String jwtToken;
        private String username;
        private String email;

        private JwtResponseBuilder() {
            // Private constructor to enforce using the builder
        }

        public JwtResponseBuilder jwtToken(String jwtToken) {
            this.jwtToken = jwtToken;
            return this;
        }

        public JwtResponseBuilder username(String username) {
            this.username = username;
            return this;
        }
        
        public JwtResponseBuilder email(String email) {
            this.email = email;
            return this;
        }

        public JwtResponse build() {
            JwtResponse response = new JwtResponse();
            response.setJwtToken(jwtToken);
            response.setUsername(username);
            response.setEmail(email);
            return response;
        }
    }
}

