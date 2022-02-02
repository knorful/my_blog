package com.example.myblog.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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
}
