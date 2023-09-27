package com.example.serversideMySql.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.example.serversideMySql.Entity.Blogs;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogsRepository extends JpaRepository<Blogs, Long> {

    List<Blogs> findByTagsContaining(String tag);
    List<Blogs> findByTagsContains(String tag); 
    List<Blogs> findByAuthor(String author);
    List<Blogs> findByAuthorContaining(String author); 
    List<Blogs> findAll();
	List<Blogs> findByTags(String tag);
}
