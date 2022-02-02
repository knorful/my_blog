package com.example.myblog.repository;

import com.example.myblog.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogPostRepo extends JpaRepository<BlogPost, Integer> {

    Optional<BlogPost> findById(Integer id);
    BlogPost getPostById(Integer id);

}
