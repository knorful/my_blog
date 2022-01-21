package com.example.myblog.controller;

import com.example.myblog.model.BlogPost;
import com.example.myblog.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
        dataService.createPost(blog);
    }

    @DeleteMapping(path = "{id}")
    public void deletePost(@PathVariable Integer id) {
        dataService.deletePost(id);
    }

    @PutMapping(path = "{id}")
    public void updatePost(@RequestBody BlogPost blog, @PathVariable Integer id) {
        dataService.updatePost(blog, id);
    }
}
