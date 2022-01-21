package com.example.myblog.service;

import com.example.myblog.model.BlogPost;
import com.example.myblog.repository.BlogPostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataService {

    @Autowired
    BlogPostRepo blogPostRepo;

    public void createPost(BlogPost blog) {
        blogPostRepo.save(blog);
    }

}
