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
    public void addPostCategories(BlogPost blog , Categories c) {
            Categories newCat = new Categories();
            newCat.setId(c.getId());
            newCat.setName(c.getName());
            blog.getPostCategories().add(newCat);
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
