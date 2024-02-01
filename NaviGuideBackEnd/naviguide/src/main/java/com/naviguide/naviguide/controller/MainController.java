package com.naviguide.naviguide.controller;


import com.naviguide.naviguide.model.Users;
import com.naviguide.naviguide.service.UserService;
import com.naviguide.naviguide.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")

public class MainController {

    @Autowired
    private UserService userServices;

    @PostMapping(value = "/save")//working
    private String saveUser(@RequestBody Users user) {
        return userServices.save(user);
    }

    @GetMapping(value = "getUser/{userName}")
    public Users getUserByUserName(@PathVariable("userName") String userName){
        return userServices.getUserByUserName(userName);
    }

    @PutMapping(value = "/updateUser/{userName}")
    public Users updateUser(@RequestBody Users user,@PathVariable(name="userName") String userName){
        user.setUserName(userName);
        userServices.update(user);
        return user;
    }

    @DeleteMapping(value = "/deleteUser/{userName}")
    public void delete(@PathVariable String userName){
        userServices.deleteUser(userName);
    }
    @GetMapping(value = "/getCat/{accCategory}")
    public List<Users> getByAccCatagory(@PathVariable String accCategory ){
        return userServices.getByAccCatagory(accCategory);
    }
//    @PutMapping(value = "/edit/{userId}")//working
//    private Users update(@RequestBody Users users,@PathVariable(name = "userId") String userId){
//        users.setUserid(userId);
//        userServices.saveOrUpdate(users);
//        return users;
//    }


//
//    @DeleteMapping(value = "/delete/{userId}")
//    private void deleteUser(@PathVariable("userId") String userId){
//        userServices.deleteUser(userId);
//    }
//
//    @RequestMapping(value = "/search/{userId}")
//    private Users getUsers(@PathVariable(name = "userId") String userId){
//        return userServices.getUserByid(userId);
//    }
//

}
