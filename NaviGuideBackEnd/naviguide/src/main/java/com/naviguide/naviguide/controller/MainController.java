package com.naviguide.naviguide.controller;


import com.naviguide.naviguide.model.Users;
import com.naviguide.naviguide.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")

public class MainController {

    @Autowired
    private UserService userServices;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @GetMapping(value = "/getallusers")
    public Iterable<Users> getAllUsers(){
        return userServices.getAllUsers();
    }

    @GetMapping("/getalluseremails")
    public List<String> getAllUserEmails() {
        return userServices.getAllUserEmails();
    }

    @PostMapping(value = "/save")//working
    private String saveUser(@RequestBody Users user) {
        return userServices.save(user);
    }

    @GetMapping(value = "getuser/{userName}")//working
    public Users getUserByUserName(@PathVariable("userName") String userName){
        return userServices.getUserByUserName(userName);
    }
    //practise
    @GetMapping(value = "/allusersbyorg/{organizationName}")
    public List<Users> getAllUsersByOrg(@PathVariable("organizationName") String organizationName){
        return userServices.getAllUsersByOrg(organizationName);
    }


    @PutMapping(value = "/updateuser/{userName}")//working
    public Users updateUser(@RequestBody Users user,@PathVariable(name="userName") String userName){
        user.setUserName(userName);
        userServices.deleteUser(userName);
        userServices.update(user);
        return user;
    }

    @DeleteMapping(value = "/deleteuser/{userName}")//working
    public void delete(@PathVariable String userName){
        userServices.deleteUser(userName);
    }

    @GetMapping(value ="getuserbyemail/{email}")//working
    public Users getUserByEmail(@PathVariable("email") String email){
        return userServices.getUserByEmail(email);
    }


    @GetMapping(value = "/getaccbycatagory/{accCategory}")//working
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


    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody Users loginUser){
        String userEmail = loginUser.getEmail();
        String password = loginUser.getPassword();
        System.out.println(password);
        Users user = userServices.getUserByEmail(userEmail);
        System.out.println(user.getPassword());
        System.out.println(passwordEncoder.encode(password));


        if (user != null && passwordEncoder.matches(password,user.getPassword())) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or Password");
        }
    }


}
