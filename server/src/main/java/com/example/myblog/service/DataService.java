package com.example.myblog.service;

import com.example.myblog.model.BlogPost;
import com.example.myblog.model.Categories;
import com.example.myblog.repository.BlogPostRepo;
import com.example.myblog.repository.CategoriesRepo;
import com.example.myblog.repository.PostCategoriesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

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

    public List<BlogPost> getPosts() {
        var sql = "SELECT pc.post_id, pc.categories_id FROM my_blog.post_categories pc";
        Query q = entityManager.createNativeQuery(sql);
        List<Object[]> rows = q.getResultList();

        for (Object[] r : rows) {
            System.out.println(">>>> " + r[0] + " | " + r[1]);
        }

        return blogPostRepo.findAll();
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
