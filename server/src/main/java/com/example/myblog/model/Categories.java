package com.example.myblog.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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

}
