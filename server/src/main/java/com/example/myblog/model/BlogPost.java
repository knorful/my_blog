package com.example.myblog.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@Table(name = "blog_post")
public class BlogPost {

    @Id
    @SequenceGenerator(
            sequenceName = "blogPostGenerator",
            allocationSize = 1,
            name = "blogPostGenerator"
    )
    @GeneratedValue (
            strategy = GenerationType.SEQUENCE,
            generator = "blogPostGenerator"
    )
    private int id;
    private String imageLink;
    private String title;
    private String content;
    @Lob
    private String mainContent;
    private Date datePosted;
    private Date dateUpdated;

    public BlogPost() {
        setPostCategories(new HashSet<>());
    }

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
            @JoinTable(
                    name="post_categories",
                    joinColumns = @JoinColumn(name = "post_id", nullable = false, updatable = false),
                    inverseJoinColumns = @JoinColumn(name = "categories_id", nullable = false, updatable = false)
            )
    public Set<Categories> postCategories;
}
