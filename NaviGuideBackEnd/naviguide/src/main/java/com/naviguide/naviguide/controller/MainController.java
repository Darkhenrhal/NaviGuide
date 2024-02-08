package com.naviguide.naviguide.controller;


import com.naviguide.naviguide.model.Users;
import com.naviguide.naviguide.service.UserService;
import com.naviguide.naviguide.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")

public class MainController {

    @Autowired
    private UserService userServices;


    @GetMapping(value = "/getAllUsers")
    public Iterable<Users> getAllUsers(){
        return userServices.getAllUsers();
    }

    @GetMapping("/getAllUserEmails")
    public List<String> getAllUserEmails() {
        return userServices.getAllUserEmails();
    }

    @PostMapping(value = "/save")//working
    private String saveUser(@RequestBody Users user) {
        return userServices.save(user);
    }

    @GetMapping(value = "getUser/{userName}")//working
    public Users getUserByUserName(@PathVariable("userName") String userName){
        return userServices.getUserByUserName(userName);
    }
    //practise
    @GetMapping(value = "/allusersbyorg/{organizationName}")
    public List<Users> getAllUsersByOrg(@PathVariable("organizationName") String organizationName){
        return userServices.getAllUsersByOrg(organizationName);
    }

    @GetMapping(value ="getUserByEmail/{email}")//working
    public Users getUserByEmail(@PathVariable("email") String email){
        return userServices.getUserByEmail(email);
    }

    @PutMapping(value = "/updateUser/{userName}")//working
    public Users updateUser(@RequestBody Users user,@PathVariable(name="userName") String userName){
        user.setUserName(userName);
        userServices.deleteUser(userName);
        userServices.update(user);
        return user;
    }

    @DeleteMapping(value = "/deleteUser/{userName}")//working
    public void delete(@PathVariable String userName){
        userServices.deleteUser(userName);
    }

    @GetMapping(value = "/getCat/{accCategory}")//working
    public List<Users> getByAccCatagory(@PathVariable String accCategory ){
        return userServices.getByAccCatagory(accCategory);
    }

    //Search by type
    @GetMapping(value = "/search")
    public Page<Users> searchUser(
            @RequestParam(required = false)String firstName,
            @RequestParam(required = false)String lastName,
            @RequestParam(required = false)String organizationName,
            @RequestParam(required = false)String accCategory,
            @RequestParam(required = false)String proffesion,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "5") Integer size

    ){
        Pageable pageable
                = PageRequest.of(page,size);
                return userServices.search(firstName,lastName,organizationName,accCategory,proffesion,pageable);
    }


//    @PostMapping(value = "/login")
//    public String Login(@RequestBody Users loginUser){
//        String userEmail=loginUser.getEmail();
//        String password=loginUser.getPassword();
//
//        Users user=userServices.getUserByEmail(userEmail);
//
//        if(user !=null && user.getPassword().equals(password)){
//            return "Login Successful";
//        }else {
//            return "Invalid Email or Password";
//
//        }
//    }

    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody Users loginUser){
        String userEmail = loginUser.getEmail();
        String password = loginUser.getPassword();

        Users user = userServices.getUserByEmail(userEmail);

        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or Password");
        }
    }
}
