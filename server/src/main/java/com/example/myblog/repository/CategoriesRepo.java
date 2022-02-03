package com.example.myblog.repository;

import com.example.myblog.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriesRepo extends JpaRepository<Categories, Integer> {
}
