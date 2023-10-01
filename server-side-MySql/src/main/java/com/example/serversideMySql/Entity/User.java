package com.example.serversideMySql.Entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.serversideMySql.Service.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users") 
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    private String email;
    private String username;
    private String password;
    private Set<UserRole> roles = new HashSet<>();
    private boolean canWriteBlog=true;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserProfile userProfile;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Implement if needed...
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        // Implement if needed...
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Implement if needed...
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Implement if needed...
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Implement if needed...
        return true;
    }
    public boolean isCanWriteBlog() {
		return canWriteBlog;
	}
	public void setCanWriteBlog(boolean canWriteBlog) {
		this.canWriteBlog = canWriteBlog;
	}

	public Set<UserRole> getRoles() {
		return roles;
	}

	public void setRoles(Set<UserRole> roles) {
		this.roles = roles;
	}	
}
