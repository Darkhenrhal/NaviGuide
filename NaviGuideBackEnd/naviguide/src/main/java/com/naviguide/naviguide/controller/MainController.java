package com.naviguide.naviguide.controller;

import com.naviguide.naviguide.model.Users;
import com.naviguide.naviguide.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    @Autowired
    UserRepository userRepo;
    @PostMapping("/addUser")
    public void addUser(@RequestBody Users user){
        userRepo.save(user);
    }
}
