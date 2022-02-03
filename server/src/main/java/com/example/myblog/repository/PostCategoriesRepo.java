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
    private BlogPostRepo repo;

    @Transactional
    public int testPersistence() {

        BlogPost bp = new BlogPost();
        bp.setImageLink("http://somelink");
        bp.setTitle("Test");
        bp.setContent("Testing the test");
        bp.setMainContent("Testing the test...please work :)");
        bp.setDatePosted(new Date());
        bp.setDateUpdated(new Date());

        Categories c = new Categories();
        c.setId(1);
        c.setName("React");


        bp.getPostCategories().add(c);
        System.out.println("post categories => " + bp.getPostCategories());

        repo.save(bp);

        System.out.println("test persistence id => " + bp.getId());
        return bp.getId();

    }

}
