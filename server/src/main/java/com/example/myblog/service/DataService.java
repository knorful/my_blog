package com.example.myblog.service;

import com.example.myblog.model.BlogPost;
import com.example.myblog.model.Categories;
import com.example.myblog.repository.BlogPostRepo;
import com.example.myblog.repository.CategoriesRepo;
import com.example.myblog.repository.PostCategoriesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {

    @Autowired
    BlogPostRepo blogPostRepo;

    @Autowired
    CategoriesRepo categoriesRepo;

    @Autowired
    PostCategoriesRepo repo;

    public List<BlogPost> getPosts() {
        return blogPostRepo.findAll();
    }

    public BlogPost getPostById(Integer id) {
        System.out.println("Getting Post By Id...");
        return blogPostRepo.getPostById(id);
    }

    public void createPost(BlogPost blog) {
        blogPostRepo.save(blog);
        repo.testPersistence();
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

    public void updatePost(BlogPost newBlog, Integer id) {
        try {
            var searchForBlog = blogPostRepo.findById(id);
            System.out.println("found this blog => " + searchForBlog);
            searchForBlog
                    .ifPresentOrElse(blog -> {
                                System.out.println(blog);
                                blogPostRepo.save(
                                        new BlogPost(
                                                id,
                                                newBlog.getImageLink(),
                                                newBlog.getTitle(),
                                                newBlog.getContent(),
                                                newBlog.getMainContent(),
                                                newBlog.getDatePosted(),
                                                newBlog.getDateUpdated(),
                                                null
                                        )
                                );
                            },
                            () -> System.out.println("blog not found!")
                    );
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void addCategory(Categories category) {
        System.out.println("Saving Category......");
        categoriesRepo.save(category);
    }

}
