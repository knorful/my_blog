package com.example.myblog.controller;

import com.example.myblog.model.BlogPost;
import com.example.myblog.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogPostController {

    @Autowired
    DataService dataService;

    @GetMapping
    public List<BlogPost> getPosts() {
        return dataService.getPosts();
    }

    @PostMapping
    public void createPost(@RequestBody BlogPost blog) {
        System.out.println("blog =>" + blog);
        dataService.createPost(blog);
    }

}
