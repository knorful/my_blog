package com.example.myblog.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.Hibernate;
import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categories")
public class Categories {

    @Id
    @SequenceGenerator(
            sequenceName = "categoriesGenerator",
            allocationSize = 1,
            name = "categoriesGenerator"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "categoriesGenerator"
    )
    private int id;
    private String name;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "postCategories")
   @JsonBackReference
    @ToString.Exclude
    Set<BlogPost> posts;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Categories that = (Categories) o;
        return false;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
