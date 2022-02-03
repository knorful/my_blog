package com.example.myblog.controller;

import com.example.myblog.model.Categories;
import com.example.myblog.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    DataService dataService;

    @PostMapping
    public String addCategory(@RequestBody Categories category) {
        dataService.addCategory(category);
        return "completed";
    }

}
