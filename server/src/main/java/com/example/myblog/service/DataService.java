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
        // SQL query to fetch post-category relationships
        String sql = "SELECT pc.post_id, pc.categories_id FROM my_blog.post_categories pc";

        // Retrieve all blog posts
        List<BlogPost> allPosts = blogPostRepo.findAll();

        // Execute the native SQL query
        Query q = entityManager.createNativeQuery(sql);
        List<Object[]> rows = q.getResultList();

        // Map to hold posts and their corresponding categories
        Map<BlogPost, List<Categories>> postCategoriesMap = new HashMap<>();

        // Map posts by their IDs for quick lookup
        Map<Integer, BlogPost> postMap = new HashMap<>();
        for (BlogPost post : allPosts) {
            postMap.put(post.getId(), post);
        }

        // Process the query results and populate the map
        for (Object[] row : rows) {
            Integer postId = (Integer) row[0];
            Integer categoryId = (Integer) row[1];

            BlogPost post = postMap.get(postId);
            if (post != null) {
                Categories category = categoriesRepo.findById(categoryId).orElse(null);
                if (category != null) {
                    postCategoriesMap.computeIfAbsent(post, k -> new ArrayList<>()).add(category);
                }
            }
        }

        // Convert the map to a JSON string
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(postCategoriesMap);
            System.out.println(json);
            return json;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // Return SQL string in case of error (consider returning an error message instead)
        return sql;
    }

    public BlogPost getPostById(Integer id) {
        System.out.println("Getting Post By Id..." + id);
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
            Optional<BlogPost> searchForBlog = blogPostRepo.findById(id);
            System.out.println("found this blog => " + searchForBlog);

            searchForBlog.ifPresentOrElse(blog -> {
                // Update fields of the existing blog post
                blog.setImageLink(newBlog.getImageLink());
                blog.setTitle(newBlog.getTitle());
                blog.setContent(newBlog.getContent());
                blog.setMainContent(newBlog.getMainContent());
                blog.setDatePosted(newBlog.getDatePosted());
                blog.setDateUpdated(newBlog.getDateUpdated());

                // Save the updated blog post
                blogPostRepo.save(blog);
            }, () -> System.out.println("blog not found!"));
        } catch (Exception e) {
            // Log the exception (consider using a logging framework like SLF4J)
            System.out.println("An error occurred while updating the post: " + e.getMessage());
            e.printStackTrace();
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
