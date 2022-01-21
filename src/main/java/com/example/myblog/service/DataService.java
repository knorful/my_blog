package com.example.myblog.service;

import com.example.myblog.model.BlogPost;
import com.example.myblog.repository.BlogPostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {

    @Autowired
    BlogPostRepo blogPostRepo;

    public List<BlogPost> getPosts() {
        return blogPostRepo.findAll();
    }

    public void createPost(BlogPost blog) {
        blogPostRepo.save(blog);
    }

    public void deletePost(Integer id) {
        System.out.println("Deleting Post ....");
        try {
            blogPostRepo.deleteById(id);
            System.out.println("Post Deleted");
        } catch (Exception e) {
            System.out.println("Post not found!");
            System.out.println(e);

        }

    }

}
