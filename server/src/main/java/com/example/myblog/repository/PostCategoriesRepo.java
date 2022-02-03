package com.example.myblog.repository;

import com.example.myblog.model.BlogPost;
import com.example.myblog.model.Categories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public class PostCategoriesRepo {

    @Autowired
    private BlogPostRepo blogPostRepo;

    @Autowired
    private CategoriesRepo categoriesRepo;

    @Transactional
    public void testPersistence(BlogPost blog , Categories c) {
        categoriesRepo.save(c);
        blog.getPostCategories().add(c);
        System.out.println("get post categories => " + blog.getPostCategories());
        blogPostRepo.save(new BlogPost(
                blog.getId(),
                blog.getImageLink(),
                blog.getTitle(),
                blog.getContent(),
                blog.getMainContent(),
                blog.getDatePosted(),
                blog.getDateUpdated(),
                blog.getPostCategories()
        ));
    }

}
