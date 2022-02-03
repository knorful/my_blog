package com.example.myblog.model;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
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

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
   @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="id")
            @JoinTable(
                    name="post_categories",
                    joinColumns = @JoinColumn(name = "post_id"),
                    inverseJoinColumns = @JoinColumn(name = "categories_id", nullable = false, updatable = false)
            )
    @ToString.Exclude
    public Set<Categories> postCategories;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BlogPost blogPost = (BlogPost) o;
        return false;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
