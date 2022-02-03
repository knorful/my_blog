package com.example.myblog.controller;

import com.example.myblog.model.Categories;
import com.example.myblog.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    DataService dataService;

    @GetMapping
    public List<Categories> getCategories() {
        return dataService.getCategories();
    }

    @DeleteMapping(path = "{id}")
    public void deleteCategories(@PathVariable String id) {
        dataService.deleteCategory(id);
    }

    @PostMapping
    public void addCategory(@RequestBody Categories category) {
        dataService.addCategory(category);
    }

    @PostMapping(path = "/selected")
    public void addSelectedCategory(@RequestBody List<String> selected) {
        dataService.getSelectedCategory(selected);
    }

}
