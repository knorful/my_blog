package com.example.myblog.repository;

import com.example.myblog.model.BlogPost;
import com.example.myblog.model.Categories;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Set;

@Repository
public class PostCategoriesRepo {

    @Autowired
    private BlogPostRepo blogPostRepo;

    @Autowired
    private CategoriesRepo categoriesRepo;

    @Transactional
    public void testPersistence( BlogPost blog) {

        Categories c = new Categories();
        c.setName("React");

        categoriesRepo.save(c);
        blog.getPostCategories().add(c);
        blogPostRepo.save(blog);

    }

}
