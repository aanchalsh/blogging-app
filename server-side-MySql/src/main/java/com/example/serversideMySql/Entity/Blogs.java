//////package com.example.serversideMySql.Entity;
//////
//////
//////import java.util.List;
//////
//////import com.fasterxml.jackson.annotation.JsonIgnore;
//////
//////import jakarta.persistence.CascadeType;
//////import jakarta.persistence.Column;
//////import jakarta.persistence.ElementCollection;
//////import jakarta.persistence.Entity;
//////import jakarta.persistence.GeneratedValue;
//////import jakarta.persistence.GenerationType;
//////import jakarta.persistence.Id;
//////import jakarta.persistence.JoinColumn;
//////import jakarta.persistence.ManyToOne;
//////import jakarta.persistence.Table;
//////
//////@Entity
//////@Table(name = "blogs") // Specify the table name for MySQL
//////public class Blogs {
//////
//////    @Id
//////    
//////    @GeneratedValue(strategy = GenerationType.IDENTITY) // Use GenerationType.IDENTITY for MySQL
//////    private Long id;
//////
//////    private String title;
//////    private String author;
//////    private String date;
//////    @Column(length = 512)
//////    private String content;
//////
//////    @ElementCollection
//////    private List<String> tags;
//////
//////    private String imageUrl;
//////    @ManyToOne(cascade = CascadeType.ALL)
//////    @JoinColumn(name = "user_profile_id")
//////    private UserProfile userProfile;
//////
//////
//////    @Override
//////	public String toString() {
//////		return "Blogs [id=" + id + ", title=" + title + ", author=" + author + ", date=" + date + ", content=" + content
//////				+ ", tags=" + tags + ", imageUrl=" + imageUrl + ", userProfile=" + userProfile + "]";
//////	}
//////
//////	public UserProfile getUserProfile() {
//////		return userProfile;
//////	}
//////
//////	public void setUserProfile(UserProfile userProfile) {
//////		this.userProfile = userProfile;
//////	}
//////
//////	public Long getId() {
//////        return id;
//////    }
//////
//////    public void setId(Long id) {
//////        this.id = id;
//////    }
//////
//////    public String getTitle() {
//////        return title;
//////    }
//////
//////    public void setTitle(String title) {
//////        this.title = title;
//////    }
//////
//////    public String getAuthor() {
//////        return author;
//////    }
//////
//////    public void setAuthor(String author) {
//////        this.author = author;
//////    }
//////
//////    public String getDate() {
//////        return date;
//////    }
//////
//////    public void setDate(String date) {
//////        this.date = date;
//////    }
//////
//////    public String getContent() {
//////        return content;
//////    }
//////
////////    public void setContent(String content) {
////////        this.content = content;
////////    }
//////    public void setContent(String content) {
//////        // Validate content length before setting it
//////        if (content != null && content.length() > 512) {
//////            throw new IllegalArgumentException("Content exceeds maximum length.");
//////        }
//////        this.content = content;
//////    }
//////
//////    public List<String> getTags() {
//////        return tags;
//////    }
//////
//////    public void setTags(List<String> tags) {
//////        this.tags = tags;
//////    }
//////
//////    public String getImageUrl() {
//////        return imageUrl;
//////    }
//////
//////    public void setImageUrl(String imageUrl) {
//////        this.imageUrl = imageUrl;
//////    }
//////}
//package com.example.serversideMySql.Entity;
//
//import java.util.List;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Column;
//import jakarta.persistence.ElementCollection;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name = "blogs")
//public class Blogs {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String title;
//    private String author;
//    public String getTitle() {
//		return title;
//	}
//
//	public void setTitle(String title) {
//		this.title = title;
//	}
//
//	public String getAuthor() {
//		return author;
//	}
//
//	public void setAuthor(String author) {
//		this.author = author;
//	}
//
//	public String getDate() {
//		return date;
//	}
//
//	public void setDate(String date) {
//		this.date = date;
//	}
//
//	public String getContent() {
//		return content;
//	}
//
//	public void setContent(String content) {
//		this.content = content;
//	}
//
//	public List<String> getTags() {
//		return tags;
//	}
//
//	public void setTags(List<String> tags) {
//		this.tags = tags;
//	}
//
//	public String getImageUrl() {
//		return imageUrl;
//	}
//
//	public void setImageUrl(String imageUrl) {
//		this.imageUrl = imageUrl;
//	}
//
//	private String date;
//    @Column(length = 512)
//    private String content;
//
//    @ElementCollection
//    private List<String> tags;
//
//    private String imageUrl;
//
//    // Correcting the cascade type to CascadeType.PERSIST or appropriate value
//    @ManyToOne(cascade = CascadeType.PERSIST)
//    @JoinColumn(name = "user_profile_id")
//    private UserProfile userProfile;
//
//    // Constructors, getters, setters, and other methods...
//
//    // Ensure you have appropriate constructors, getters, and setters for all fields.
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    // Other getters and setters for fields like title, author, date, content, tags, imageUrl...
//
//    public UserProfile getUserProfile() {
//        return userProfile;
//    }
//
//    public void setUserProfile(UserProfile userProfile) {
//        this.userProfile = userProfile;
//    }
//}
//
package com.example.serversideMySql.Entity;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "blogs") // Specify the table name for MySQL
public class Blogs {

    @Id
    
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Use GenerationType.IDENTITY for MySQL
    private Long id;

    private String title;
    private String author;
    private String date;
    @Column(length = 512)
    private String content;

    @ElementCollection
    private List<String> tags;

    private String imageUrl;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_profile_id")
    private UserProfile userProfile;


    @Override
	public String toString() {
		return "Blogs [id=" + id + ", title=" + title + ", author=" + author + ", date=" + date + ", content=" + content
				+ ", tags=" + tags + ", imageUrl=" + imageUrl + ", userProfile=" + userProfile + "]";
	}

	public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

//    public void setContent(String content) {
//        this.content = content;
//    }
    public void setContent(String content) {
        // Validate content length before setting it
        if (content != null && content.length() > 512) {
            throw new IllegalArgumentException("Content exceeds maximum length.");
        }
        this.content = content;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
