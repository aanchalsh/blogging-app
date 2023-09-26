package com.example.serversideremote.Entity;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="allblogs")
public class Blogs {
	@Override
	public String toString() {
		return "Blogs [id=" + id + ", title=" + title + ", author=" + author + ", date=" + date + ", content=" + content
				+ ", tags=" + tags + ", imageUrl=" + imageUrl + "]";
	}
	@Id
	private String id;
	private String title;
    private String author;
    public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	private String date;
    private String content;
    private List<String> tags;
    private String imageUrl;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
	public void setContent(String content) {
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
