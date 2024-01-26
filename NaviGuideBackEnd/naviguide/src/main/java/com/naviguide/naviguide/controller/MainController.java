package com.naviguide.naviguide.controller;


import com.naviguide.naviguide.model.Users;
import com.naviguide.naviguide.service.UserService;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")

public class MainController {

    @Autowired
    private UserService userServices;

    @PostMapping(value = "/save")//working
    private String saveUser(@RequestBody Users users) {
        userServices.saveOrUpdate(users);
        return users.getUserid();
    }

    @PutMapping(value = "/edit/{userId}")//working
    private Users update(@RequestBody Users users,@PathVariable(name = "userId") String userId){
        users.setUserid(userId);
        userServices.saveOrUpdate(users);
        return users;
    }

    @DeleteMapping(value = "/delete/{userId}")
    private void deleteUser(@PathVariable("userId") String userId){
        userServices.deleteUser(userId);
    }

    @RequestMapping(value = "/search/{userId}")
    private Users getUsers(@PathVariable(name = "userId") String userId){
        return userServices.getUserByid(userId);
    }

    @RequestMapping(value = "/search/{userName}")
    private Users getUserByUserName(@PathVariable(name="userName") String userName){
        System.out.println("im at 1");
        //return userServices.getUserByUsername(userName);
        Users user = userServices.getUserByUsername(userName);

        if (user != null) {
            // Print user information
            System.out.println("User found: " + user.toString());

            // You can also return the user information as JSON or any other format

        } else {
            // Print a message indicating that the user was not found
            System.out.println("User not found with username: " + userName);

            // You can also return an appropriate response, such as an error messag
        }
        return user;
    }
}
