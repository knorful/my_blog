package com.example.myblog.controller;

import com.example.myblog.model.BlogPost;
import com.example.myblog.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/blog")
public class BlogPostController {

    @Autowired
    DataService dataService;

    @PostMapping
    public void createPost(@RequestBody BlogPost blog) {
        System.out.println("blog =>" + blog);
        dataService.createPost(blog);
    }

}
