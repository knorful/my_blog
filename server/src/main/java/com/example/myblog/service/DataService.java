package com.example.myblog.service;

import com.example.myblog.model.BlogPost;
import com.example.myblog.model.Categories;
import com.example.myblog.repository.BlogPostRepo;
import com.example.myblog.repository.CategoriesRepo;
import com.example.myblog.repository.PostCategoriesRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.*;

@Service
public class DataService {

    @Autowired
    BlogPostRepo blogPostRepo;

    @Autowired
    CategoriesRepo categoriesRepo;

    @Autowired
    PostCategoriesRepo repo;

    @Autowired
    EntityManager entityManager;

    private List<String> selectedCategories;

    public String getPosts() {
        var sql = "SELECT pc.post_id, pc.categories_id FROM my_blog.post_categories pc";
        var getAllPosts = blogPostRepo.findAll();
        Query q = entityManager.createNativeQuery(sql);
        List<Object[]> rows = q.getResultList();
        HashMap<HashMap<String, Object>, Categories> map = new HashMap<>();

        for (var i = 0; i < getAllPosts.size(); i++) {
            for (Object[] r : rows) {
                var currPost = getAllPosts.get(i);
                Integer postId = (Integer) r[0];
                Integer categoryId = (Integer) r[1];
                HashMap<String, Object> blog = new HashMap<>();

                blog.put("id", currPost.getId());
                blog.put("content", currPost.getContent());
                blog.put("datePosted", currPost.getDatePosted());
                blog.put("dateUpdated", currPost.getDateUpdated());
                blog.put("imageLink", currPost.getImageLink());
                blog.put("mainContent", currPost.getMainContent());
                blog.put("title", currPost.getTitle());

                if (currPost.getId() == postId) {
                    var foundCat = categoriesRepo.findById(categoryId).get();
                    map.put(blog, foundCat);
                }
            }
        }

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(map);
            System.out.println(json);
            return json;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

//        System.out.println("list >>>> " + map);

//        return map;
        return sql;
    }

    public BlogPost getPostById(Integer id) {
        System.out.println("Getting Post By Id...");
        return blogPostRepo.getPostById(id);
    }

    public void createPost(BlogPost blog) {
        var savedPost = blogPostRepo.save(blog);
        var categories = getCategories();

        for (Categories c : categories) {
            if (selectedCategories.contains(c.getName().toLowerCase())) {
                repo.addPostCategories(savedPost, c);
            }
        }
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

//    ********** Categories **************

    public void addCategory(Categories category) {
        System.out.println("Saving Category......");
        categoriesRepo.save(category);
    }

    public List<Categories> getCategories() {
        return Optional.of(categoriesRepo.findAll()).get();
    }

    public void deleteCategory(String id) {
        System.out.println("Deleting Category...");
        var cats = getCategories();

        for (Categories c : cats) {
            if (Objects.equals(c.getName(), id)) {
                categoriesRepo.deleteById(c.getId());
            }
        }

    }

    public void getSelectedCategory(List<String> selected) {
         selectedCategories = selected;
    }

}
