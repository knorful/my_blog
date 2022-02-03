package com.example.myblog.model;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name="selected_categories")
public class SelectedCategories {

    @Id
    private int id;
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SelectedCategories that = (SelectedCategories) o;
        return false;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
